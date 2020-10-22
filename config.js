var config_in_mem=JSON.parse('{"admin":{ "cmc":"https://cmc.hs.cmdhome.net:8443", "endpoint":"https://cmc.hs.cmdhome.net:19443","apiuser":"sysadmin", "apipw":"public", "auth":"Basic c3lzYWRtaW46cHVibGlj"}, "dataowner":{"cuser":"cloudian_adm","cgroup":"default"},"s3api":{"endpoint":"http://s3-region.hs.cmdhome.net","accessKeyId":"00ea11f0e76752fb87e5","secretAccessKey":"kHbrfwWtEA82BrZzH7P2BdMQDofCrz7KZVmqJBP/","bucket":"bucket"}}');

config_in_mem.title="S3 CLI Helper v1.05 - 21 Oct 2020"
config_in_mem.s3api.endpoint="http://s3-region.hs.cmdhome.net",
config_in_mem.s3api.accessKeyId="00ea11f0e76752fb87e5";
config_in_mem.s3api.secretAccessKey="kHbrfwWtEA82BrZzH7P2BdMQDofCrz7KZVmqJBP/";
config_in_mem.s3api.bucket="bucket";
config_in_mem.s3api.mountpoint="/media/_BUCKET_";
config_in_mem.s3api.objectKey="myfile.txt";
config_in_mem.standalone=true;
config_in_mem.zipfile="Cloudian-S3CliHelper-1.05.zip";

var index=0;
config_in_mem.tools=[];
config_in_mem.tools.push({});
config_in_mem.tools[index].cli="aws $AWS_OPTS";
config_in_mem.tools[index].opts="export AWS_OPTS=\"_SSL_ --endpoint-url=_S3_ENDPOINT_ --profile _PROFILE_ --region _REGION_\""
config_in_mem.tools[index].credentials="(UNIX) ~/.aws/credentials (WINDOWS) C:\\Users\\%USERNAME%\\.aws\\credentials"
config_in_mem.tools[index].label="Amazon CLI (UNIX and Windows)";
config_in_mem.tools[index].docURL="https://docs.aws.amazon.com/cli/latest/reference/s3/";
config_in_mem.tools[index].action=[];
config_in_mem.tools[index].action.push("list bucket");
config_in_mem.tools[index].action.push("download object");
config_in_mem.tools[index].action.push("upload object");
config_in_mem.tools[index].action.push("create object locked bucket");
//config_in_mem.tools[index].action.push("create presigned url");
config_in_mem.tools[index].cmd=[];
config_in_mem.tools[index].cmd.push("_CLI_ s3 ls s3://_BUCKET_");
config_in_mem.tools[index].cmd.push("_CLI_ s3 cp s3://_BUCKET_/_OBJECT_ ./_OBJECT_");
config_in_mem.tools[index].cmd.push("_CLI_ s3 cp ./_OBJECT_ s3://_BUCKET_/_OBJECT_");
config_in_mem.tools[index].cmd.push("_CLI_ s3api create-bucket --bucket _BUCKET_ --region _REGION_ --object-lock-enabled-for-bucket")
//config_in_mem.tools[index].cmd.push("_CLI_ s3 presign s3://_BUCKET_/_OBJECT_ --expires-in _EXPIRES_IN_")



index=1;
config_in_mem.tools.push({});
config_in_mem.tools[index].cli="/usr/bin/s3cmd";
config_in_mem.tools[index].credentials="~/.s3cfg"
config_in_mem.tools[index].label="S3cmd (s3tools.org)";
config_in_mem.tools[index].docURL="https://s3tools.org/s3cmd";
config_in_mem.tools[index].action=[];
config_in_mem.tools[index].action.push("list bucket");
config_in_mem.tools[index].action.push("download object");
config_in_mem.tools[index].action.push("upload object");
config_in_mem.tools[index].cmd=[];
config_in_mem.tools[index].cmd.push("_CLI_ ls s3://_BUCKET_");
config_in_mem.tools[index].cmd.push("_CLI_ cp s3://_BUCKET_/_OBJECT_ ./_OBJECT_");
config_in_mem.tools[index].cmd.push("_CLI_ cp ./_OBJECT_ s3://_BUCKET_/_OBJECT_");

config_in_mem.tools.push({});
index=2;
config_in_mem.tools[index].cli="/usr/bin/hs-s3curl.pl";
config_in_mem.tools[index].credentials="(UNIX) ~/.s3curl (WINDOWS) C:\\Users\\%USERNAME%\\.s3curl"
config_in_mem.tools[index].label="s3curl.pl (cloudian.com)";
config_in_mem.tools[index].docURL="https://github.com/rtdp/s3curl"
config_in_mem.tools[index].action=[];
config_in_mem.tools[index].action.push("list bucket");
config_in_mem.tools[index].action.push("download object");
config_in_mem.tools[index].action.push("upload object");
config_in_mem.tools[index].cmd=[];
config_in_mem.tools[index].cmd.push("_CLI_ -- _S3_ENDPOINT_/_BUCKET_");
config_in_mem.tools[index].cmd.push("_CLI_ -- _S3_ENDPOINT_/_BUCKET_/_OBJECT_ > ./_OBJECT_");
config_in_mem.tools[index].cmd.push("_CLI_ --put _OBJECT_ -- _S3_ENDPOINT_/_BUCKET_/_OBJECT_");

config_in_mem.tools.push({});
index=3;
config_in_mem.tools[index].cli="/usr/bin/s3fs";
config_in_mem.tools[index].credentials="~/.passwd-s3fs"
config_in_mem.tools[index].label="S3 Filesystem";
config_in_mem.tools[index].docURL="https://github.com/s3fs-fuse/s3fs-fuse"
config_in_mem.tools[index].action=[];
config_in_mem.tools[index].action.push("list bucket");
config_in_mem.tools[index].action.push("download object");
config_in_mem.tools[index].action.push("upload object");
config_in_mem.tools[index].mount="_CLI_ _BUCKET_ _MOUNTPOINT_ -o use_path_request_style -o url=_S3_ENDPOINT_ -o allow_other"
config_in_mem.tools[index].cmd=[];
config_in_mem.tools[index].cmd.push("ls _MOUNTPOINT_");
config_in_mem.tools[index].cmd.push("cp _MOUNTPOINT_/_OBJECT_ .");
config_in_mem.tools[index].cmd.push("cp ./_OBJECT_ _MOUNTPOINT_/_OBJECT_");


config_in_mem.tools.push({});
index=4;
config_in_mem.tools[index].cli="/opt/splunk/bin/splunk";
config_in_mem.tools[index].credentials="indexes.conf"
config_in_mem.tools[index].label="Splunk SmartStore (NEW!)";
config_in_mem.tools[index].docURL="https://data.cloudian.com/l/677273/2020-02-27/58pr9/677273/57844/Cloudian_Splunk_SmartStore_Deployment_Tuning_Guide.pdf"
config_in_mem.tools[index].action=[];
config_in_mem.tools[index].action.push("validation");
config_in_mem.tools[index].action.push("evice cache");

config_in_mem.tools[index].cmd=[];
config_in_mem.tools[index].cmd.push("_CLI_ cmd splunkd rfs -- ls --starts-with volume:_PROFILE_"); 

config_in_mem.tools[index].cmd.push("_CLI_ | dbinspect cached=f index=\"_PROFILE_\" -auth splunk:password > /tmp/buckets\nCACHEPATH=\`cat /tmp/buckets | awk \'{print $9}\'\`\nfor i in $CACHEPATH; do\ncurl -ku splunk:password \"https://localhost:8089/services/admin/cacheman/_evict\" -d path=$i -d mb=99999999999\ndone\n");

var curtool=-1;
var curmode=-1;
