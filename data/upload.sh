aws s3api put-object     --bucket crowdsourcing-tasks-us  --key MedicalTask-New-4/Big-0/Task/dimensions.json         --body tasks/MedicalTask-New-4/Big-0/task/dimensions.json                --content-type application/json       &&
aws s3api put-object     --bucket crowdsourcing-tasks-us  --key MedicalTask-New-4/Big-0/Task/hits.json               --body tasks/MedicalTask-New-4/Big-0/task/hits.json                      --content-type application/json       &&
aws s3api put-object     --bucket crowdsourcing-tasks-us  --key MedicalTask-New-4/Big-0/Task/instructions.html       --body tasks/MedicalTask-New-4/Big-0/task/instructions.html              --content-type application/json       &&
aws s3api put-object     --bucket crowdsourcing-tasks-us  --key MedicalTask-New-4/Big-0/Task/instructions.json       --body tasks/MedicalTask-New-4/Big-0/task/instructions.json              --content-type application/json       &&
aws s3api put-object     --bucket crowdsourcing-tasks-us  --key MedicalTask-New-4/Big-0/Task/questionnaires.json     --body tasks/MedicalTask-New-4/Big-0/task/questionnaires.json            --content-type application/json       &&
aws s3api put-object     --bucket crowdsourcing-tasks-us  --key MedicalTask-New-4/Big-0/Task/search_engine.json      --body tasks/MedicalTask-New-4/Big-0/task/search_engine.json             --content-type application/json       &&
aws s3api put-object     --bucket crowdsourcing-tasks-us  --key MedicalTask-New-4/Big-0/Task/task.json               --body tasks/MedicalTask-New-4/Big-0/task/task.json                      --content-type application/json       &&
aws s3api put-object     --bucket crowdsourcing-tasks-us  --key MedicalTask-New-4/Big-0/Task/workers.json            --body tasks/MedicalTask-New-4/Big-0/task/workers.json                   --content-type application/json       &&
aws s3api put-object     --bucket crowdsourcing-deploy-us --key MedicalTask-New-4/Big-0/crowdsourcing-task.css       --body tasks/MedicalTask-New-4/Big-0/deploy/crowdsourcing-task.css       --content-type text/css               &&
aws s3api put-object     --bucket crowdsourcing-deploy-us --key MedicalTask-New-4/Big-0/crowdsourcing-task-es5.js    --body tasks/MedicalTask-New-4/Big-0/deploy/crowdsourcing-task-es5.js    --content-type application/javascript &&
aws s3api put-object     --bucket crowdsourcing-deploy-us --key MedicalTask-New-4/Big-0/crowdsourcing-task-es2015.js --body tasks/MedicalTask-New-4/Big-0/deploy/crowdsourcing-task-es2015.js --content-type application/javascript &&
aws s3api put-object     --bucket crowdsourcing-deploy-us --key MedicalTask-New-4/Big-0/index.html                   --body tasks/MedicalTask-New-4/Big-0/deploy/index.html                   --content-type text/html              &&
aws s3api put-object-acl --bucket crowdsourcing-deploy-us --key MedicalTask-New-4/Big-0/crowdsourcing-task.css       --acl public-read                                                                                            &&
aws s3api put-object-acl --bucket crowdsourcing-deploy-us --key MedicalTask-New-4/Big-0/crowdsourcing-task-es5.js    --acl public-read                                                                                            &&
aws s3api put-object-acl --bucket crowdsourcing-deploy-us --key MedicalTask-New-4/Big-0/crowdsourcing-task-es2015.js --acl public-read                                                                                            &&
aws s3api put-object-acl --bucket crowdsourcing-deploy-us --key MedicalTask-New-4/Big-0/index.html                   --acl public-read