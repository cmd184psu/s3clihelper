var config_in_mem=JSON.parse('{"admin":{ "cmc":"https://cmc.hs.cmdhome.net:8443", "endpoint":"https://cmc.hs.cmdhome.net:19443","apiuser":"sysadmin", "apipw":"public", "auth":"Basic c3lzYWRtaW46cHVibGlj"}, "dataowner":{"cuser":"cloudian_adm","cgroup":"default"},"s3api":{"endpoint":"http://s3-region.hs.cmdhome.net","accessKeyId":"00ea11f0e76752fb87e5","secretAccessKey":"kHbrfwWtEA82BrZzH7P2BdMQDofCrz7KZVmqJBP/","bucket":"bucket"}}');

config_in_mem.title="S3 CLI Helper v1.05 - 22 Oct 2020"
config_in_mem.s3api.endpoint="http://s3-region.hs.cmdhome.net",
config_in_mem.s3api.accessKeyId="00ea11f0e76752fb87e5";
config_in_mem.s3api.secretAccessKey="kHbrfwWtEA82BrZzH7P2BdMQDofCrz7KZVmqJBP/";
config_in_mem.s3api.bucket="bucket";
config_in_mem.s3api.mountpoint="/media/_BUCKET_";
config_in_mem.s3api.objectKey="myfile.txt";
config_in_mem.s3api.storagePolicy="1bc90238f9f11cb32f5e4e901675d50b";
config_in_mem.s3api.iamendpoint="http://iam.hs.cmdhome.net:16080";
config_in_mem.standalone=true;
config_in_mem.zipfile="Cloudian-S3CliHelper-1.05.zip";

const ADD_S3CLI=true
const ADD_S3CURL=true
const ADD_S3CMD=true
const ADD_S3FS=true
const ADD_SPLUNK=true
const ADD_KUBERNETES=true

var thisToolItem=new Object;
config_in_mem.tools=[];


if(ADD_S3CLI) {
    thisToolItem.cli="aws $AWS_OPTS";
    thisToolItem.opts="export AWS_OPTS=\"_SSL_ --endpoint-url=_S3_ENDPOINT_ --profile _PROFILE_ --region _REGION_\""
    thisToolItem.credentials="(UNIX) ~/.aws/credentials (WINDOWS) C:\\Users\\%USERNAME%\\.aws\\credentials"
    thisToolItem.label="Amazon CLI (UNIX and Windows)";
    thisToolItem.docURL="https://docs.aws.amazon.com/cli/latest/reference/s3/";
    thisToolItem.action=[];
    thisToolItem.action.push("list bucket");
    thisToolItem.action.push("download object");
    thisToolItem.action.push("upload object");
    thisToolItem.action.push("create object locked bucket");
    thisToolItem.action.push("list MPUs (Multi-part Uploads in progress)");
    thisToolItem.action.push("abort a particular MPU (Multi-part Upload)");
    //thisToolItem.action.push("create presigned url");
    thisToolItem.cmd=[];
    thisToolItem.cmd.push("_CLI_ s3 ls s3://_BUCKET_");
    thisToolItem.cmd.push("_CLI_ s3 cp s3://_BUCKET_/_OBJECT_ ./_OBJECT_");
    thisToolItem.cmd.push("_CLI_ s3 cp ./_OBJECT_ s3://_BUCKET_/_OBJECT_");
    thisToolItem.cmd.push("_CLI_ s3api create-bucket --bucket _BUCKET_ --object-lock-enabled-for-bucket")
    thisToolItem.cmd.push("_CLI_ s3api list-multipart-uploads --bucket _BUCKET_"); 
    thisToolItem.cmd.push("_CLI_ s3api abort-multipart-upload --bucket _BUCKET_ --key _OBJECT_ --upload-id 12345");
    //thisToolItem.cmd.push("_CLI_ s3 presign s3://_BUCKET_/_OBJECT_ --expires-in _EXPIRES_IN_")
    
    thisToolItem.configContent="[_PROFILE_]\nregion = _REGION_\naws_access_key_id = _S3_ACCESS_KEY_ID_\naws_secret_access_key = _S3_SECRET_ACCESS_KEY_"
    config_in_mem.tools.push(thisToolItem);
    thisToolItem={}
}

if(ADD_S3CMD) {
    thisToolItem.opts="export S3CMD_OPTS=\"--no-check-certificate --region=_REGION_ --access_key=_S3_ACCESS_KEY_ID_ --secret_key=_S3_SECRET_ACCESS_KEY_\""
    thisToolItem.cli="/usr/bin/s3cmd $S3CMD_OPTS";
    //thisToolItem.storagePolicy=x-gmt-policyid: 1bc90238f9f11cb32f5e4e901675d50b="--add-header=_HEADER_";
    thisToolItem.credentials="~/.s3cfg"
    thisToolItem.label="S3cmd (s3tools.org)";
    thisToolItem.docURL="https://s3tools.org/s3cmd";
    thisToolItem.action=[];
    thisToolItem.action.push("list bucket");
    thisToolItem.action.push("download object");
    thisToolItem.action.push("upload object");
    thisToolItem.action.push("create bucket (custom policy)");
    thisToolItem.action.push("create bucket (custom policy and object lock)");
    thisToolItem.cmd=[];
    thisToolItem.cmd.push("_CLI_ ls s3://_BUCKET_");
    thisToolItem.cmd.push("_CLI_ get s3://_BUCKET_/_OBJECT_ ./_OBJECT_");
    thisToolItem.cmd.push("_CLI_ put ./_OBJECT_ s3://_BUCKET_/_OBJECT_");
    thisToolItem.cmd.push("_CLI_ mb s3://_BUCKET_ --add-header=\"x-gmt-policyid: _STORAGE_POLICY_\"");
    thisToolItem.cmd.push("_CLI_ mb s3://_BUCKET_ --add-header=\"x-gmt-policyid: _STORAGE_POLICY_\" --add-header=\"x-amz-object-lock-enabled: true\"");


    thisToolItem.configContent="[_PROFILE_]\naccess_key = _S3_ACCESS_KEY_ID_"+
        "secret_key = _S3_SECRET_ACCESS_KEY_\n"+
        "host_base = _EXTRACTED_HOSTNAME_\n"+
        "host_bucket = _BUCKET_\n"+
        "use_https = false";

    config_in_mem.tools.push(thisToolItem);
    thisToolItem={}
}

if(ADD_S3CURL) {
    thisToolItem.cli="/usr/bin/hs-s3curl.pl";
    thisToolItem.credentials="(UNIX) ~/.s3curl (WINDOWS) C:\\Users\\%USERNAME%\\.s3curl"
    thisToolItem.label="s3curl.pl (cloudian.com)";
    thisToolItem.docURL="https://github.com/rtdp/s3curl"
    thisToolItem.action=[];
    thisToolItem.action.push("list bucket");
    thisToolItem.action.push("download object");
    thisToolItem.action.push("upload object");
    thisToolItem.cmd=[];
    thisToolItem.cmd.push("_CLI_ -- _S3_ENDPOINT_/_BUCKET_");
    thisToolItem.cmd.push("_CLI_ -- _S3_ENDPOINT_/_BUCKET_/_OBJECT_ > ./_OBJECT_");
    thisToolItem.cmd.push("_CLI_ --put _OBJECT_ -- _S3_ENDPOINT_/_BUCKET_/_OBJECT_");


    thisToolItem.configContent="%awsSecretAccessKeys = (\n\t_PROFILE_ => {\n\t\t"+
    "id => \'_S3_ACCESS_KEY_ID_\',\n\t\tkey => \'_S3_SECRET_ACCESS_KEY_\',\n\t},\n);";
    config_in_mem.tools.push(thisToolItem);
    thisToolItem={}
}

if(ADD_S3FS) {
    thisToolItem.cli="/usr/bin/s3fs";
    thisToolItem.opts="export S3FS_OPTS=\"-o use_path_request_style -o url=_S3_ENDPOINT_ -o allow_other\""
    thisToolItem.credentials="~/.passwd-s3fs"
    thisToolItem.label="S3 Filesystem";
    thisToolItem.docURL="https://github.com/s3fs-fuse/s3fs-fuse"
    thisToolItem.action=[];
    thisToolItem.action.push("list bucket");
    thisToolItem.action.push("download object");
    thisToolItem.action.push("upload object");
    thisToolItem.mount="_CLI_ _BUCKET_ _MOUNTPOINT_ $S3FS_OPTS"
    thisToolItem.cmd=[];
    thisToolItem.cmd.push("ls _MOUNTPOINT_");
    thisToolItem.cmd.push("cp _MOUNTPOINT_/_OBJECT_ .");
    thisToolItem.cmd.push("cp ./_OBJECT_ _MOUNTPOINT_/_OBJECT_");


    thisToolItem.configContent="_S3_ACCESS_KEY_ID_:_S3_SECRET_ACCESS_KEY_";
    config_in_mem.tools.push(thisToolItem);
    thisToolItem={}
}

if(ADD_SPLUNK) {
    thisToolItem.cli="/opt/splunk/bin/splunk";
    thisToolItem.credentials="indexes.conf"
    thisToolItem.label="Splunk SmartStore (NEW!)";
    thisToolItem.docURL="https://data.cloudian.com/l/677273/2020-02-27/58pr9/677273/57844/Cloudian_Splunk_SmartStore_Deployment_Tuning_Guide.pdf"
    thisToolItem.action=[];
    thisToolItem.action.push("validation");
    thisToolItem.action.push("evice cache");

    thisToolItem.cmd=[];
    thisToolItem.cmd.push("_CLI_ cmd splunkd rfs -- ls --starts-with volume:_PROFILE_"); 

    thisToolItem.cmd.push("_CLI_ | dbinspect cached=f index=\"_PROFILE_\" -auth splunk:password > /tmp/buckets\nCACHEPATH=\`cat /tmp/buckets | awk \'{print $9}\'\`\nfor i in $CACHEPATH; do\ncurl -ku splunk:password \"https://localhost:8089/services/admin/cacheman/_evict\" -d path=$i -d mb=99999999999\ndone\n");
    
    thisToolItem.configContent="[volume:_VOLUME_]\nrepFactor = auto\nstorageType = remote\npath = s3://_BUCKET_\n"+
"remote.s3.signature_version = v2\nremote.s3.access_key = _S3_ACCESS_KEY_ID_\n"+
"remote.s3.secret_key = _S3_SECRET_ACCESS_KEY_\nremote.s3.endpoint = _S3_ENDPOINT_\n\n"+

"[_PROFILE_]\nrepFactor = auto\nremotePath = volume:_VOLUME_/$_index_name\n"+
"homePath = $SPLUNK_DB/$_index_name/db\ncoldPath = $SPLUNK_DB/$_index_name/colddb\nthawedPath = $SPLUNK_DB/$_index_name/thaweddb\n"+
"maxDataSize = auto\nhostlist_recency_secs = 864000"; 
      
    
    
    config_in_mem.tools.push(thisToolItem);
    thisToolItem={}
}

if(ADD_KUBERNETES) {
    thisToolItem.cli="kubectl";
    thisToolItem.credentials="bucket-owner-secret.yaml"
    thisToolItem.label="Cloudian Kubernetes Operator (NEW!)";
    thisToolItem.docURL="https://s3.cloudianhyperstore.com/downloads/HyperStore/CloudianK8sS3Operator_QuickStart_v-1.0.pdf";
    thisToolItem.action=[];
    thisToolItem.action.push("Create Secret Credentials");
    thisToolItem.action.push("Apply Greenfield Storage Class");
    thisToolItem.action.push("Verify Configuration");

    thisToolItem.cmd=[];
    thisToolItem.cmd.push("_CLI_ apply -f "+thisToolItem.credentials);
    thisToolItem.cmd.push("_CLI_ apply -f cloudian-greenfield-storageclass.yaml");
    thisToolItem.cmd.push("_CLI_ apply -f verify.yaml");
    thisToolItem.configContent="#bucket-owner-secret.yaml\napiVersion: v1\n"+
    "kind: Secret\n"+
    "metadata:\n"+
    " name: s3-bucket-owner\n"+
    " namespace: cloudian-s3-operator\n"+
    "type: Opaque\n"+
    "data:\n"+
    " AWS_ACCESS_KEY_ID: \"_S3_AKI_B64_\"\n"+
    " AWS_SECRET_ACCESS_KEY: \"_S3_SAK_B64_\"\n\n"+

    "#cloudian-greenfield-storageclass.yaml\n"+
    "kind: StorageClass\n"+
    "apiVersion: storage.k8s.io/v1\n"+
    "metadata:\n"+
    " name: _STORAGE_CLASS_\n"+
    "provisioner: cloudian-s3.io/bucket\n"+
    "parameters:\n"+
    "region: _REGION_\n"+
    "secretName: s3-bucket-owner\n"+
    "secretNamespace: cloudian-s3-operator\n"+
    "s3Endpoint: _S3_ENDPOINT_\n"+
    "iamEndpoint: _IAM_ENDPOINT_\n"+
    "storagePolicyId: _STORAGE_POLICY_\n"+
    "#createBucketUser: <optional override of creating an IAM user per bucket claim>\n"+
    "#bucketClaimUserSecretName: <optional dedicated Secret for bucket access>\n"+
    "#bucketClaimUserSecretNamespace: <only if bucketClaimUserSecretName is set>\n"+
    "#iamPolicy: <optional IAM policy document>\n"+
    "reclaimPolicy: Delete\n\n"+
    
    "# verify.yaml - verify your setup\n"+
    "apiVersion: objectbucket.io/v1alpha1\n"+
    "kind: ObjectBucketClaim\n"+
    "metadata:\n"+
    " name: test-setup-check\n"+
    "spec:\n"+
    " generateBucketName: test-setup-check\n"+
    " storageClassName: _STORAGE_CLASS_\n"+
    "---\n"+
    "apiVersion: v1\n"+
    "kind: Pod\n"+
    "metadata:\n"+
    "name: test-setup-check\n"+
    "spec:\n"+
    " containers:\n"+
    " - name: test-setup-check\n"+
    " image: k8s.gcr.io/busybox\n"+
    " command: [ \"/bin/sh\", \"-c\", \"env\" ]\n"+
    " envFrom:\n"+
    " - configMapRef:\n"+
    " name: test-setup-check\n"+
    " - secretRef:\n"+
    " name: test-setup-check\n"+
    " restartPolicy: Never\n";

    config_in_mem.tools.push(thisToolItem);
    thisToolItem={}
}


var curtool=-1;
var curmode=-1;
