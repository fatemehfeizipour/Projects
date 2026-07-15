terraform {
    backend "s3" {
       bucket = ""
       key = "global/s3/terraform.tfstate"
       region = "ca-central-1"
       dynamodb_table = ""

    } 
}

