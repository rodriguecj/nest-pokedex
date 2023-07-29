pipeline {
    agent any
    environment {
        TARGET_REGION = "us-east-1"
        BOT_URL = credentials('telegram')
    }    
    stages {
        stage('Install dependencies ') {
            parallel {
                stage('Init') {
                    steps {
                        echo 'Intall with npm install'
                    }
                }
                stage('Test') {
                    steps {
                        echo 'Test with npm run test'
                    }
                }
            } // end parallel
        }

        stage('sast') {
            parallel {
                stage('secrets-Horusec') {
                    steps {
                        echo 'SAST: secrets-Horusec'
                        /* sh './automation/security.sh horusec' */
                        /* stash name: 'report_horusec.json', includes: 'report_horusec.json' */
                    }
                }
                stage('Secrets-Gitleaks') {
                    steps {
                        echo 'SAST: Secrets-Gitleaks'
                        /* script {
                            def result = sh label: "Secrets", returnStatus: true,
                                script: """\
                                    ./automation/security.sh secrets
                            """
                            if (result > 0) {
                                unstable(message: "Secrets issues found")
                            }   
                            } */
                    }
                }
                stage('S') {
                    /* agent{
                        docker{
                            image 'returntocorp/semgrep'
                            args '-u root:root'                    
                        }
                    } */
                    steps {
                        echo 'SAST: Secrets-Gitleaks'
                         /* sh '''
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
                         stash name: 'report_semgrep.json', includes: 'report_semgrep.json' */
                    }
                }
                stage('audit') {
                    /* agent {
                        docker {
                            image 'node:18-alpine'
                            args '-u root:root'
                        }           
                    } */
                    steps {
                        echo 'Auditing'
                        /* catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                            sh 'npm audit --registry=https://registry.npmjs.org -audit-level=critical --json > report_npmaudit.json'
                            stash name: 'report_npmaudit.json', includes: 'report_npmaudit.json'
                        }  */
                    }
                }
            }
        }
    
        stage('Build') {
            steps {
                echo 'Building App...'
            }
        }

        stage('Check-AWS-Beanstalk') {
            steps {
                echo 'Checking AWS-Beanstalk...'
                /* withAWS(credentials: 'aws-roxsross', region: "${TARGET_REGION}" ) {
                sh './automation/aws_beanstalk.sh check'
                } */
            }
        }

        stage('Deploy-AWS-Beanstalk') {
            steps {
                echo 'Deploying AWS-Beanstalk...'
               /*  withAWS(credentials: 'aws-roxsross', region: "${TARGET_REGION}" ) {
                sh './automation/aws_beanstalk.sh deploy'
                } */
            }
        }
        
        stage('Notifications') {
            // when {
            //     branch 'master'
            // }
            steps {
                echo 'Notification'
            }
        }
    }
}