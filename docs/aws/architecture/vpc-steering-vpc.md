img/aws/architecture/vpc-peering-connection.png

This solution involves three distinct virtual private clouds (VPCs) for Marketing, Finance, and Development departments. The Finance VPC hosts resources required by both Marketing and Development VPCs.

Marketing - Finance - Developer

- Marketing

  - CIDR: 10.10.0.0/16
  - Private IP: 10.10.0.202
  - subnet-07198073d349549ad (connecting-vpc/Marketing VPC/MarketingPublicSubnet1)
  - Routing Table: connecting-vpc/Marketing VPC/MarketingPublicSubnet1

- Finance
  - CIDR: 172.31.0.0/16
  - IP: 172.31.0.167
- Developer
  - CIDR: 192.168.0.0/20
  - Private IP: 192.168.0.209
