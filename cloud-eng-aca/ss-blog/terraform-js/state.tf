terraform {
    backend "s3" {
        bucket = "ff-my-terraform-state"
        key = "ss-blog/terraform.tfstate"
        region = "ca-central-1"
        # use_lockfile = true
        dynamodb_table = "terraform-lock-file"
    }
} 