import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class PortfolioInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'PortfolioInfrastructureQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    //Amplify application
    const amplifyApp = new amplify.App(this, 'PortfolioApplication', {
      appName: 'Portfolio',
      //Connect to my github repo
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: "fatemehfeizipour",
        repository: 'Projects',
        oauthToken: cdk.SecretValue.secretsManager ('github-token')
      }),

      //Build Specification
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: '1.0',
        frontend: {
          phases: {
            preBuild: {
              commands: [
                'echo "starting this build"',
                'cd Nextjs-portfolio-amplify-project/my-portfolio',
                'npm install'
              ],
            },
            build: {
              commands: [
                'echo "building our nextjs app..."',
                'npm run build',
                'echo "build is completed"'
              ],
            },
          },
          artifacts: {
            baseDirectory: 'Nextjs-portfolio-amplify-project/my-portfolio/out',
            files: ['**/*'],
          },
          cache: {
            paths: [
              'node_modules/**/*',
              '.next/cache/**/*'
            ]
          }
        }
    })
    
    })
    const mainBranch = amplifyApp.addBranch('main', {
      autoBuild: true 
      })
  }
}
