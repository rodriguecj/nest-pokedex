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
        stage('Build - ECR'){
            steps {
                withAWS(credentials: 'aws_jenkins', region: 'us-east-1') {
                    sh './automation/docker_build.sh'
                    sh './automation/docker_push.sh'
                }
            }
        }
        stage('Build-Docker-compose and Check EB'){
            parallel {
                stage('Build Compose with new Docker-image'){
                    steps {
                        sh './automation/aws_beanstalk.sh compose'
                    }
                }
                stage('Check AWS Elastic-beanstalk'){
                    steps {
                        sh './automation/aws_beanstalk.sh check'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                withAWS(credentials: 'aws_jenkins', region: 'us-east-1') {
                    sh './automation/aws_beanstalk.sh deploy'
                }
            }
        }
    }
}