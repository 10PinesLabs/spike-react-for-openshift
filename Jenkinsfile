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

          stage('Build') {
            milestone()

            def packageVersion = sh 'npm run version --silent'
            currentBuild.displayName = "#${env.BUILD_NUMBER} - ${packageVersion}"

            sh 'npm prune'
            sh 'npm install'
            sh 'npm test'
          }

          if (params.MAKE_RELEASE) {
            stage('Artifactory') {
              lock(resource: "${projectName}-artifactory", inversePrecedence: true) {
                sh 'npm run build'
                sh 'npm run release'
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
