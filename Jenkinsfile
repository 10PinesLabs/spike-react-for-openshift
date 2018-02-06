timestamps {
  currentBuild.result = "SUCCESS"

  def projectName = "spike-frontend"

  properties([
    parameters([
      booleanParam(name: 'MAKE_RELEASE', defaultValue: false, description: 'Crear un release y subir a Artifactory')
    ]),
    pipelineTriggers([
      pollSCM('@daily')
    ])
  ])

  node {
    try {
      lock(resource: "${projectName}-${env.BRANCH_NAME}-build", inversePrecedence: true) {

          stage('Checkout') {
            deleteDir()
            checkout scm
          }

          stage('NodeJS') {
              def node = tool name: 'node894', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
              env.PATH = "${node}/bin:${env.PATH}"

              sh 'npm config set https-proxy http://localhost:3128'
          }


          stage('Build') {
            milestone()

            def packageVersion = sh 'npm run version --silent'
            currentBuild.displayName = "#${env.BUILD_NUMBER} - ${packageVersion}"

            sh 'npm install'
            sh 'npm test'
          }

          if (params.MAKE_RELEASE) {
            stage('Artifactory') {
              lock(resource: "${projectName}-artifactory", inversePrecedence: true) {
                sh 'npm run build'
                sh 'npm run release-patch'
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
