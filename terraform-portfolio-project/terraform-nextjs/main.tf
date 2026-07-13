provider "aws" {
    region = "ca-central-1"
}

#Initialize and Apply Terraform

#terraform init
#terraform plan
# Review for any issues and resolve if needed
#terraform apply

# VPC
resource "aws_vpc" "main" {
    cidr_block  = "192.168.0.0/16"
    tags = {
        Name = "main-tf-vpc"
    }
}


# Subnet 1

resource "aws_subnet" "subnet1" {
    vpc_id  =   aws_vpc.main.id
    cidr_block = "192.168.1.0/24"
    availability_zone = "ca-central-1a"
    tags = {
        Name = "subnet1"
    }
}

# Subnet 2

resource "aws_subnet" "subnet2" {
    vpc_id = aws_vpc.main.id
    cidr_block = "192.168.2.0/24"
    availability_zone = "ca-central-1b"
    tags = {
        Name = "subnet2"
    }
}

# Internet Gateway
resource "aws_internet_gateway" "gw" {
    vpc_id = aws_vpc.main.id

    tags = {
        Name = "main-vpc-igw"
    }
}

# Route Table
resource "aws_route_table" "routetable" {
    vpc_id = aws_vpc.main.id

    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.gw.id
    }

    tags = {
        Name = "main-route-table"
    }
}

# Route Table Association Subnet1
resource "aws_route_table_association" "a" {
    subnet_id = aws_subnet.subnet1.id 
    route_table_id = aws_route_table.routetable.id 
}

# Route Table Association Subnet2
resource "aws_route_table_association" "b" {
    subnet_id = aws_subnet.subnet2.id 
    route_table_id = aws_route_table.routetable.id
}

# S3 Bucket Resource
resource "aws_s3_bucket" "website" {
  bucket = "fatemeh-nextjs-portfolio-2026"

  tags = {
    Name        = "Portfolio Website"
    Environment = "Production"
  }
}

# S3 Bucket Website Configuration
resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# S3 Bucket Policy Resource
resource "aws_s3_bucket_policy" "website_policy" {
  bucket = aws_s3_bucket.website.id
  depends_on = [aws_s3_bucket_public_access_block.website]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.website.arn}/*"
      }
    ]
  })
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "website_distribution" {
  origin {
    domain_name = aws_s3_bucket_website_configuration.website.website_endpoint
    origin_id   = "S3-Website"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-Website"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Name        = "Portfolio CloudFront"
    Environment = "Production"
  }
}

# S3 Block Public Access

resource "aws_s3_bucket_public_access_block" "website" {
  bucket = aws_s3_bucket.website.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}