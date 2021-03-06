timestamps {
  currentBuild.result = "SUCCESS"

  def projectName = "spike-frontend"

  properties([
    parameters([
      booleanParam(name: 'RELEASE', defaultValue: false, description: 'Release?'),
      booleanParam(name: 'RELEASE_PATCH', defaultValue: false, description: 'Releasear un patch y subir a Artifactory'),
      booleanParam(name: 'RELEASE_MINOR', defaultValue: false, description: 'Releasear un minor y subir a Artifactory'),
      booleanParam(name: 'RELEASE_MAJOR', defaultValue: false, description: 'Releasear un major y subir a Artifactory')

    ]),
    pipelineTriggers([
      pollSCM('@daily')
    ])
  ])

  node {
    try {
      lock(resource: "${projectName}-${env.BRANCH_NAME}-build", inversePrecedence: true) {

          stage('SetUp') {
            deleteDir()
            checkout scm

            def node = tool name: 'node894', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
            env.PATH = "${node}/bin:${env.PATH}"

            sh 'npm config set https-proxy http://localhost:3128'
          }

          stage('Test') {
            milestone()

            def packageVersion = sh 'npm run version --silent'
            currentBuild.displayName = "#${env.BUILD_NUMBER} - ${packageVersion}"

            sh 'npm install'
            sh 'npm test'
          }

          if (params.RELEASE) {
            stage('Release') {
              lock(resource: "${projectName}-artifactory", inversePrecedence: true) {
                  sh 'npm run build'
                  if (params.RELEASE_PATCH) {
                    sh 'npm run release-patch'
                  }
                  if (params.RELEASE_MINOR) {
                    sh 'npm run release-minor'
                  }
                  if (params.RELEASE_MAJOR) {
                    sh 'npm run release-major'
                  }
              }
            }
          }
      }
    } catch (err) {
      currentBuild.result = "FAILURE"
      throw err
    }
  }
}
