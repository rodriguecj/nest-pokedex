pipeline { 
    agent any 
    stages {
        stage('Test') { 
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
        stage('Build'){
            steps {
                echo 'Building Docker...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
}