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

        stage('SAST - Security'){
            parallel {
                /* stage('Secrete'){
                    steps {
                        sh './automation/security.sh hadolint'
                    }
                } */
                stage('Horusec'){
                    steps {
                        sh './automation/security.sh horusec'
                        stash name: 'report_horusec.json', includes: 'report_horusec.json'
                    }
                }
                stage('Semgrep') {
                    agent{
                        docker{
                            image 'returntocorp/semgrep'
                            args '-u root:root'                    
                        }
                    }
                    steps {
                         sh '''
                        cat << 'EOF' | bash
                            semgrep ci --config=auto --json --output=report_semgrep.json --max-target-bytes=2MB
                            EXIT_CODE=$?
                            if [ "$EXIT_CODE" = "0" ] || [ "$EXIT_CODE" = "1" ]
                            then
                                exit 0
                            else
                                exit $EXIT_CODE
                            fi
                        EOF
                         '''
                         stash name: 'report_semgrep.json', includes: 'report_semgrep.json'
                    }
                }
            }
        }

        /* stage('Build - ECR'){
            steps {
                withAWS(credentials: 'aws_jenkins', region: 'us-east-1') {
                    sh './automation/docker_build.sh'
                    sh './automation/docker_push.sh'
                }
            }
        } */
        /* stage('Build-Docker-compose and Check EB'){
            parallel {
                stage('Build Compose with new Docker-image'){
                    steps {
                        sh './automation/aws_beanstalk.sh compose'
                    }
                }
                stage('Check AWS Elastic-beanstalk'){
                    steps {
                        withAWS(credentials: 'aws_jenkins', region: 'us-east-1') {
                            sh './automation/aws_beanstalk.sh check'
                        }
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
        } */
    }
}