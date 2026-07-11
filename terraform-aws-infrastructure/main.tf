provider "aws" {
    region = "ca-central-1"
}

# write
# Terraform init
# Terraform plan
# Terraform apply
# Terraform destroy

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
