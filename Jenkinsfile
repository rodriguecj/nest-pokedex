pipeline { 
    agent any 
    stages {
        stage('Build') { 
            agent {
                docker { image 'node:18.16.0-alpine' }
            }
            steps {
                sh 'node --version'
            }
        }
        stage('Test'){
            steps {
                echo 'Testing...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
}