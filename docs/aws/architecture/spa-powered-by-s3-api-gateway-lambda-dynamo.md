img/aws/architecture/spa-powered-by-s3-api-gateway-lambda-dynamo.png

- Step1
  You can use Amazon S3 to host a static web app, or single-page app (SPA), that requires only a single load in a web browser. All subsequent actions by the user are made available through HTML, JavaScript, and CSS files that are preloaded in the browser.
- Step2
  When you configure your S3 bucket as a static website, the website is available at the AWS Region-specific website endpoint of the bucket. Users can directly access the public URL.
- Step3
  An Amazon S3 static website can access other resources, such as Amazon API Gateway, by calling those endpoints directly over HTTP.
- Step4
  The request can then be sent to an AWS Lambda function through an integration with API Gateway.
- Step5
  The Lambda function will select the correct data from the Amazon DynamoDB table and return the payload to API Gateway.
- Step6
  API Gateway returns the payload back to the Amazon S3 static website resource that made the request.
