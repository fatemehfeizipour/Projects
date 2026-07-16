terraform {
    backend "s3" {
       bucket = ""
       key = "global/s3/terraform.tfstate"
       region = "ca-central-1"
       dynamodb_table = ""

    } 
}

# Team collaboration
# Avoiding state loss
# Locking do two people don't apply at once
# Security
# Recovery
