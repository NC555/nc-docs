img/aws/architecture/high-availability.png

- step1: Amazon Route 53 manages DNS services, translating domain names (such as example.com) into IP addresses.
- step2: User requests connect to an Amazon CloudFront distribution through the resolved IP address, reducing latency through content caching and delivery optimization.
- step3: Amazon S3 stores static assets (images and videos) for CloudFront caching and distribution.
- step4: Elastic Load Balancing (ELB) distributes application traffic across multiple Availability Zones, while an EC2 Auto Scaling group manages instance capacity based on demand.
- step6: Application servers connect to an Amazon RDS instance, providing a managed database environment that supports multiple databases and standard access tools.
- step7: Auto scaling adjusts EC2 instance count according to defined scaling policies.
- step8: EC2 Auto Scaling groups integrate with CloudWatch for metrics monitoring and with ELB for dynamic load distribution.
- step9: When CPU utilization exceeds 80 percent for a specified duration, the system automatically launches additional web servers and adds them to the load balancer. RDS failover instances provide database redundancy during primary instance failures.
