export const iamRoleSteps = [
    {
      number: 1,
      text: (
        <>
          Log into AWS account &nbsp;
          <a
            href="https://console.aws.amazon.com/iamv2/home?#/roles/create"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline font-medium"
          >
            Create an IAM Role.
          </a>
        </>
      ),
    },
    {
      number: 2,
      text: (
        <>
     In the <strong>Name</strong> field, enter below-mentioned policy name and click on Create Policy
     </>
      ),
      showTextarea: true,
    },
    {
      number: 3,
      text: (
        <>
          Click on <strong>Next</strong> to go to the <em>Add permissions</em> page. We would not be adding any permissions for now because the permission policy content will be dependent on the AWS Account ID retrieved from the IAM Role. Click on <strong>Next</strong>.
        </>
      ),
    },
    {
      number: 4,
      text: (
        <>
          In the <em>Role name</em> field, enter the below-mentioned role name, and click on <strong>Create Role</strong>:
        </>
      ),
      showInput: true,
    },
  ];


  
  export const IAM_POLICY = `{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::951485052809:root"
        },
        "Action": "sts:AssumeRole",
        "Condition": {
          "StringEquals": {
            "sts:ExternalId": "Um9neXDRS19EUiRUbVlJZlpZTktZTntN2E0OS90NW93LTp3aWxlQmM4ZEx7ZTJzMjQw"
          }
        }
      }
    ]
  }`;
  
  export const defaultRoleName = "CK-Tuner-Role-dev2";

  export const JSON =`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CostAudit",
      "Effect": "Allow",
      "Action": [
        "dms:Describe*",
        "dms:List*",
        "kafka:Describe*",
        "kafka:Get*",
        "kafka:List*",
        "mq:Describe*",
        "mq:List*",
        "route53resolver:Get*",
        "route53resolver:List*",
        "memorydb:Describe*",
        "savingsplans:Describe*",
        "cloudsearch:Describe*",
        "quicksight:Describe*",
        "quicksight:List*",
        "codepipeline:Get*",
        "codepipeline:List*",
        "codebuild:List*",
        "codebuild:Get*",
        "codebuild:Describe*",
        "codebuild:BatchGet*",
        "codedeploy:List*",
        "codedeploy:BatchGet*",
        "codedeploy:Get*",
        "mediaconnect:Describe*",
        "mediaconnect:List*",
        "mediaconvert:Describe*",
        "mediaconvert:Get*",
        "mediaconvert:List*",
        "medialive:Describe*",
        "medialive:List*",
        "mediapackage:Describe*",
        "mediapackage:List*",
        "mediapackage-vod:Describe*",
        "mediapackage-vod:List*",
        "mediastore:DescribeObject",
        "mediastore:Get*",
        "mediastore:List*",
        "mediatailor:Describe*",
        "mediatailor:Get*",
        "mediatailor:List*",
        "ec2:Describe*",
        "elasticache:Describe*",
        "events:DescribeEventBus",
        "events:List*",
        "elasticloadbalancing:Describe*",
        "kinesis:List*",
        "kinesis:Describe*",
        "kinesisanalytics:Describe*",
        "kinesisanalytics:List*",
        "dynamodb:Describe*",
        "dynamodb:List*",
        "cloudwatch:Describe*",
        "cloudwatch:List*",
        "cloudwatch:GetMetricStatistics",
        "ecr:GetLifecyclePolicy",
        "ecr:GetRepositoryPolicy",
        "ecr-public:DescribeRepositories",
        "ecr:List*",
        "ecr:Describe*",
        "lambda:List*",
        "lambda:GetPolicy",
        "lambda:GetAccountSettings",
        "lambda:GetFunctionConfiguration",
        "lambda:GetFunctionCodeSigningConfig",
        "lambda:GetFunctionConcurrency",
        "lambda:GetFunctionConfiguration",
        "rds:Describe*",
        "rds:ListTagsForResource",
        "sqs:GetQueueAttributes",
        "sqs:List*",
        "firehose:Describe*",
        "firehose:List*",
        "kafka:Describe*",
        "kafka:List*",
        "glue:GetDevEndpoint",
        "s3:GetBucketPolicy",
        "s3:List*",
        "network-firewall:Describe*",
        "network-firewall:List*",
        "elasticfilesystem:Describe*",
        "kms:Describe*",
        "kms:List*",
        "kms:GetKeyRotationStatus",
        "kms:GetKeyPolicy",
        "elasticmapreduce:List*",
        "es:Describe*",
        "es:List*",
        "es:Get*",
        "aoss:Get*",
        "aoss:List*",
        "logs:Describe*",
        "logs:List*",
        "application-autoscaling:Describe*",
        "route53:List*",
        "redshift:Describe*",
        "backup:Describe*",
        "backup:Get*",
        "backup:List*",
        "dlm:Get*",
        "dlm:List*",
        "sagemaker:List*",
        "lambda:Get*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "BillingReadOnly",
      "Effect": "Allow",
      "Action": [
        "billingconductor:List*",
        "billing:ListBillingViews"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ComputeOptimizerReadAccess",
      "Effect": "Allow",
      "Action": [
        "compute-optimizer:Get*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CostExplorerAccess",
      "Effect": "Allow",
      "Action": [
        "ce:Describe*",
        "ce:Get*",
        "ce:List*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CURReportDefinitions",
      "Effect": "Allow",
      "Action": [
        "organizations:Describe*",
        "organizations:List*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "PricingAPIAccess",
      "Effect": "Allow",
      "Action": [
        "pricing:*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "WellArchitectedAccess",
      "Effect": "Allow",
      "Action": [
        "wellarchitected:*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ReadOnlyForOrgServices",
      "Effect": "Allow",
      "Action": [
        "detective:Describe*",
        "detective:List*",
        "detective:Get*",
        "devops-guru:Describe*",
        "devops-guru:List*",
        "devops-guru:Get*",
        "devops-guru:Search*",
        "guardduty:Describe*",
        "guardduty:Get*",
        "guardduty:List*",
        "inspector:Describe*",
        "inspector:Get*",
        "inspector2:List*",
        "inspector2:Get*",
        "inspector2:Describe*",
        "macie2:Describe*",
        "macie2:Get*",
        "macie2:List*",
        "account:Get*",
        "account:ListRegions",
        "auditmanager:Get*",
        "auditmanager:List*",
        "controltower:Describe*",
        "controltower:Get*",
        "controltower:List*",
        "sso:Describe*",
        "sso:List*",
        "sso:Get*",
        "sso:Search*",
        "sso-directory:Describe*",
        "sso-directory:Get*",
        "sso-directory:List*",
        "sso-directory:Search*",
        "aws-marketplace:DescribeAgreement",
        "aws-marketplace:Get*",
        "aws-marketplace:List*",
        "aws-marketplace:ViewSubscriptions",
        "aws-marketplace:SearchAgreements",
        "networkmanager:DescribeGlobalNetworks",
        "networkmanager:Get*",
        "networkmanager:List*",
        "trustedadvisor:Describe*",
        "trustedadvisor:List*",
        "cloudtrail:Describe*",
        "cloudtrail:Get*",
        "cloudtrail:List*",
        "cloudtrail:LookupEvents",
        "cloudformation:Describe*",
        "cloudformation:Get*",
        "cloudformation:List*",
        "compute-optimizer:DescribeRecommendationExportJobs",
        "config:Describe*",
        "config:Get*",
        "config:List*",
        "ds:Describe*",
        "ds:Get*",
        "ds:List*",
        "fms:Get*",
        "fms:List*",
        "access-analyzer:Get*",
        "access-analyzer:List*",
        "healthlake:Describe*",
        "healthlake:GetCapabilities",
        "healthlake:List*",
        "healthlake:ReadResource",
        "healthlake:Search*",
        "health:Describe*",
        "license-manager:Get*",
        "license-manager:List*",
        "servicecatalog:Describe*",
        "servicecatalog:Get*",
        "servicecatalog:List*",
        "servicecatalog:ScanProvisionedProducts",
        "servicecatalog:Search*",
        "securityhub:Describe*",
        "securityhub:Get*",
        "securityhub:List*",
        "ssm:Describe*",
        "ssm:List*",
        "ram:Get*",
        "ram:List*",
        "servicequotas:Get*",
        "servicequotas:List*",
        "s3:Describe*",
        "license-manager:GetGrant",
        "license-manager:ListTokens",
        "license-manager-user-subscriptions:List*"
      ],
      "Resource": "*"
    }
  ]
}`;


export const JSON2 = `{
 {
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SecAudit",
      "Effect": "Allow",
      "Action": [
        "cloudfront:List*",
        "cloudfront:Get*",
        "cloudfront:Describe*",
        "ecr:DescribeRepositories",
        "ecr:BatchGetRepositoryScanningConfiguration",
        "iam:List*",
        "iam:Get*",
        "lambda:GetFunctionConfiguration",
        "lambda:GetFunctionUrlConfig",
        "cloudwatch:GetMetricStatistics",
        "ec2:DescribeInstances",
        "ec2:DescribeVpcs",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeNetworkInterfaces",
        "redshift:DescribeClusters",
        "inspector2:BatchGetAccountStatus",
        "ec2:DescribeFlowLogs",
        "securityhub:GetEnabledStandards",
        "s3:ListAllMyBuckets",
        "s3:GetBucketLogging",
        "s3:GetEncryptionConfiguration",
        "s3:GetBucketPolicyStatus",
        "s3:GetBucketAcl",
        "s3:GetBucketVersioning",
        "s3:GetAccountPublicAccessBlock",
        "s3:GetBucketCORS",
        "s3:GetBucketPolicy",
        "s3:GetBucketVersioning",
        "s3:GetEncryptionConfiguration",
        "s3:GetLifecycleConfiguration",
        "sts:GetCallerIdentity",
        "wafv2:List*",
        "wafv2:Get*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "SecAuditServiceQuotas",
      "Effect": "Allow",
      "Action": [
        "states:ListStateMachines",
        "servicequotas:GetServiceQuota",
        "acm:List*",
        "acm:DescribeCertificate",
        "athena:ListWorkGroups",
        "athena:GetWorkGroup",
        "apigateway:GET",
        "autoscaling:Describe*",
        "cloudformation:DescribeAccountLimits",
        "cloudformation:DescribeStacks",
        "cloudwatch:GetMetricData",
        "ds:GetDirectoryLimits",
        "ec2:Describe*",
        "ec2:GetEbsDefaultKmsKeyId",
        "ec2:GetEbsEncryptionByDefault",
        "ecs:Describe*",
        "ecs:List*",
        "eks:Describe*",
        "eks:List*",
        "elasticache:DescribeCacheClusters",
        "elasticache:DescribeCacheParameterGroups",
        "elasticache:DescribeCacheSecurityGroups",
        "elasticache:DescribeCacheSubnetGroups",
        "elasticbeanstalk:DescribeApplicationVersions",
        "elasticbeanstalk:DescribeApplications",
        "elasticbeanstalk:DescribeEnvironments",
        "elasticfilesystem:DescribeFileSystems",
        "firehose:ListDeliveryStreams",
        "lambda:GetAccountSettings",
        "redshift:DescribeClusterSnapshots",
        "redshift:DescribeClusterSubnetGroups",
        "route53:GetHostedZone",
        "route53:GetHostedZoneLimit",
        "route53:ListHostedZones",
        "servicequotas:List*",
        "servicequotas:Get*",
        "ses:Get*",
        "ses:List*",
        "support:Describe*",
        "support:SearchForCases",
        "trustedadvisor:Describe*",
        "trustedadvisor:GenerateReport",
        "trustedadvisor:RefreshCheck",
        "iam:GenerateCredentialReport",
        "iam:GetCredentialReport",
        "secretsmanager:ListSecrets",
        "secretsmanager:DescribeSecret",
        "sns:List*",
        "sns:Get*",
        "artifact:ListReports",
        "artifact:GetReportMetadata",
        "artifact:GetReport",
        "artifact:GetTermForReport"
      ],
      "Resource": "*"
    },
    {
      "Sid": "NewReadAccountBillingPermissions",
      "Effect": "Allow",
      "Action": [
        "consolidatedbilling:GetAccountBillingRole",
        "consolidatedbilling:ListLinkedAccounts",
        "billing:Get*",
        "payments:ListPaymentPreferences",
        "invoicing:GetInvoicePDF",
        "invoicing:ListInvoiceSummaries"
      ],
      "Resource": "*"
    }
  ]
}`;

export const JSON3 = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SecAudit",
      "Effect": "Allow",
      "Action": [
        "cloudfront:List*",
        "cloudfront:Get*",
        "cloudfront:Describe*",
        "ecr:DescribeRepositories",
        "ecr:BatchGetRepositoryScanningConfiguration",
        "iam:List*",
        "iam:Get*",
        "lambda:GetFunctionConfiguration",
        "lambda:GetFunctionUrlConfig",
        "cloudwatch:GetMetricStatistics",
        "ec2:DescribeInstances",
        "ec2:DescribeVpcs",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeNetworkInterfaces",
        "redshift:DescribeClusters",
        "inspector2:BatchGetAccountStatus",
        "ec2:DescribeFlowLogs",
        "securityhub:GetEnabledStandards",
        "s3:ListAllMyBuckets",
        "s3:GetBucketLogging",
        "s3:GetEncryptionConfiguration",
        "s3:GetBucketPolicyStatus",
        "s3:GetBucketAcl",
        "s3:GetBucketVersioning",
        "s3:GetAccountPublicAccessBlock",
        "s3:GetBucketCORS",
        "s3:GetBucketPolicy",
        "s3:GetBucketVersioning",
        "s3:GetEncryptionConfiguration",
        "s3:GetLifecycleConfiguration",
        "sts:GetCallerIdentity",
        "wafv2:List*",
        "wafv2:Get*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "SecAuditServiceQuotas",
      "Effect": "Allow",
      "Action": [
        "states:ListStateMachines",
        "servicequotas:GetServiceQuota",
        "acm:List*",
        "acm:DescribeCertificate",
        "athena:ListWorkGroups",
        "athena:GetWorkGroup",
        "apigateway:GET",
        "autoscaling:Describe*",
        "cloudformation:DescribeAccountLimits",
        "cloudformation:DescribeStacks",
        "cloudwatch:GetMetricData",
        "ds:GetDirectoryLimits",
        "ec2:Describe*",
        "ec2:GetEbsDefaultKmsKeyId",
        "ec2:GetEbsEncryptionByDefault",
        "ecs:Describe*",
        "ecs:List*",
        "eks:Describe*",
        "eks:List*",
        "elasticache:DescribeCacheClusters",
        "elasticache:DescribeCacheParameterGroups",
        "elasticache:DescribeCacheSecurityGroups",
        "elasticache:DescribeCacheSubnetGroups",
        "elasticbeanstalk:DescribeApplicationVersions",
        "elasticbeanstalk:DescribeApplications",
        "elasticbeanstalk:DescribeEnvironments",
        "elasticfilesystem:DescribeFileSystems",
        "firehose:ListDeliveryStreams",
        "lambda:GetAccountSettings",
        "redshift:DescribeClusterSnapshots",
        "redshift:DescribeClusterSubnetGroups",
        "route53:GetHostedZone",
        "route53:GetHostedZoneLimit",
        "route53:ListHostedZones",
        "servicequotas:List*",
        "servicequotas:Get*",
        "ses:Get*",
        "ses:List*",
        "support:Describe*",
        "support:SearchForCases",
        "trustedadvisor:Describe*",
        "trustedadvisor:GenerateReport",
        "trustedadvisor:RefreshCheck",
        "iam:GenerateCredentialReport",
        "iam:GetCredentialReport",
        "secretsmanager:ListSecrets",
        "secretsmanager:DescribeSecret",
        "sns:List*",
        "sns:Get*",
        "artifact:ListReports",
        "artifact:GetReportMetadata",
        "artifact:GetReport",
        "artifact:GetTermForReport"
      ],
      "Resource": "*"
    },
    {
      "Sid": "NewReadAccountBillingPermissions",
      "Effect": "Allow",
      "Action": [
        "consolidatedbilling:GetAccountBillingRole",
        "consolidatedbilling:ListLinkedAccounts",
        "billing:Get*",
        "payments:ListPaymentPreferences",
        "invoicing:GetInvoicePDF",
        "invoicing:ListInvoiceSummaries"
      ],
      "Resource": "*"
    }
  ]
}`;


export const JSON4=`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ec2:StartInstances",
        "ec2:StopInstances",
        "autoscaling:UpdateAutoScalingGroup",
        "rds:StartDBInstance",
        "rds:StopDBInstance",
        "rds:StartDBCluster",
        "rds:StopDBCluster",
        "ecs:UpdateService",
        "redshift:ResumeCluster",
        "redshift:PauseCluster",
        "sagemaker:StartNotebookInstance",
        "sagemaker:StopNotebookInstance"
      ],
      "Resource": [
        "*"
      ],
      "Effect": "Allow",
      "Sid": "SchedulerAccess"
    }
  ]
}`;

export const JSON5=`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "cur:ValidateReportDestination",
        "cur:DescribeReportDefinitions"
      ],
      "Resource": [
        "*"
      ],
      "Effect": "Allow",
      "Sid": "ReadCostAndUsageReport"
    },
    {
      "Action": [
        "s3:ListBucket",
        "s3:GetReplicationConfiguration",
        "s3:GetObjectVersionForReplication",
        "s3:GetObjectVersionAcl",
        "s3:GetObjectVersionTagging",
        "s3:GetObjectRetention",
        "s3:GetObjectLegalHold",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::ck-tuner-275595855473",
        "arn:aws:s3:::ck-tuner-275595855473/*"
      ],
      "Effect": "Allow",
      "Sid": "S3LimitedRead"
    },
    {
      "Action": [
        "s3:GetObjectVersionTagging",
        "s3:GetBucketVersioning",
        "s3:ReplicateObject",
        "s3:ReplicateDelete",
        "s3:ReplicateTags",
        "s3:ObjectOwnerOverrideToBucketOwner"
      ],
      "Resource": [
        "arn:aws:s3:::ck-tuner-cur-dev2-1000291",
        "arn:aws:s3:::ck-tuner-cur-dev2-1000291/*"
      ],
      "Effect": "Allow",
      "Sid": "S3Replicate"
    },
    {
      "Action": [
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::ck-tuner-275595855473/CKTunerTestFile",
      "Effect": "Allow",
      "Sid": "S3ReplicationCheck"
    }
  ]
}`;

export const TEXTS = {
  clickJson: " Click on the<strong>JSON</strong>tab and paste the following policy and click on Next:",
  enterName: "In the <strong>Name</strong> field, enter below-mentioned policy name and click on Create Policy",
  
}
