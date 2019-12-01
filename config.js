var config_in_mem=JSON.parse('{"admin":{ "cmc":"https://cmc.hs.cmdhome.net:8443", "endpoint":"https://cmc.hs.cmdhome.net:19443","apiuser":"sysadmin", "apipw":"public", "auth":"Basic c3lzYWRtaW46cHVibGlj"}, "dataowner":{"cuser":"cloudian_adm","cgroup":"default"},"s3api":{"endpoint":"http://s3-region.hs.cmdhome.net","accessKeyId":"00ea11f0e76752fb87e5","secretAccessKey":"kHbrfwWtEA82BrZzH7P2BdMQDofCrz7KZVmqJBP/","bucket":"bucket"}}');

config_in_mem.s3api.endpoint="http://s3-region.hs.cmdhome.net",
config_in_mem.s3api.accessKeyId="00ea11f0e76752fb87e5";
config_in_mem.s3api.secretAccessKey="kHbrfwWtEA82BrZzH7P2BdMQDofCrz7KZVmqJBP/";
config_in_mem.s3api.bucket="bucket";
config_in_mem.s3api.mountpoint="/media/_BUCKET_";
config_in_mem.s3api.objectKey="myfile.txt";
config_in_mem.standalone=true;

var index=0;
config_in_mem.tools=[];
config_in_mem.tools.push({});
config_in_mem.tools[index].cli="/usr/bin/aws s3";
config_in_mem.tools[index].credentials="~/.aws/credentials"
config_in_mem.tools[index].label="Amazon CLI (UNIX)";
config_in_mem.tools[index].docURL="https://docs.aws.amazon.com/cli/latest/reference/s3/";
config_in_mem.tools[index].action=[];
config_in_mem.tools[index].action.push("list bucket");
config_in_mem.tools[index].action.push("download object");
config_in_mem.tools[index].action.push("upload object");
config_in_mem.tools[index].cmd=[];
config_in_mem.tools[index].cmd.push("_CLI_ ls s3://_BUCKET_ --endpoint-url=_S3_ENDPOINT_");
config_in_mem.tools[index].cmd.push("_CLI_ cp s3://_BUCKET_/_OBJECT_ ./_OBJECT_ --endpoint-url=_S3_ENDPOINT_");
config_in_mem.tools[index].cmd.push("_CLI_ cp ./_OBJECT_ s3://_BUCKET_/_OBJECT_ --endpoint-url=_S3_ENDPOINT_");



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
config_in_mem.tools[index].credentials="~/.s3curl"
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



var curtool=-1;
var curmode=-1;
