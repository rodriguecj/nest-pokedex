pipeline { 
    agent any 
    stages {
        stage('Build') { 
            parallel {
                stage('Init'){
                    agent {
                        docker {
                            image 'node:18-alpine'
                            args '-u root:root'
                        }           
                    }
                    steps {
                        sh 'npm install'
                    }
                }

                stage('Unit Tests'){
                    agent {
                        docker {
                            image 'node:18-alpine'
                            args '-u root:root'
                        }           
                    }
                    steps {
                        sh 'npm run test'
                    }
                }
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