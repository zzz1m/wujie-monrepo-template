export const paramModel = {
    'group-interview_assessment_a77a-f2dc-446a-a099-1954-evaluation': {
        'value': {
            'userid': '',
            'interviewTime': '',
            'advice': '',
            'suggest': ''
        },
        'parentId': 'group-interview_assessment_a77a-f2dc-446a-a099-1954',
        'copyId': '',
        'sort': ''
    },
    'group-interview_assessment_a77a-f2dc-446a-a099-1954': {
        'value': {
            'userid': '',
            'interviewTime': '',
            'advice': '',
            'suggest': ''
        },
        'parentId': '',
        'copyId': '',
        'sort': ''
    },
    'relation-interview-basicinfo-single_45a7-3962-40be-8fb4-1cea|user_info|probation_code': {
        'value': '这是编辑拉',
        'parentId': 'basic_columns_7253-9b7d-4157-bbda-e950',
        'copyId': '',
        'sort': ''
    },
    'relation-interview-basicinfo-single_cd0b-8c0c-4380-bf65-6d3d|user_info_job|dept_id': {
        'value': 'BZL/店长直聘线/商业/北京商业一组',
        'parentId': 'basic_columns_7253-9b7d-4157-bbda-e950',
        'copyId': '',
        'sort': ''
    },
    'relation-interview-order_9edf-2756-4743-8499-bb95|interview_info|interviewer_id': {
        'value': '王晓臣',
        'parentId': 'basic_columns_7253-9b7d-4157-bbda-e950',
        'copyId': '',
        'sort': ''
    },
    'relation-interview-approval_b480-5e59-4b8d-b445-6668|user_info_leave_job|last_day': {
        'value': '2022-10-04',
        'parentId': 'basic_columns_7253-9b7d-4157-bbda-e950',
        'copyId': '',
        'sort': ''
    },
    'relation-interview-basicinfo-multiple_db2f-b2b3-415c-a737-e4f3|user_info_edu_exp': {
        'value': [
            {
                'start_date': null,
                'school_name': '枣庄学院',
                'is_985': '否',
                'id': '6909323412a0b373ly6qGg~~'
            },
            {
                'start_date': null,
                'school_name': '怪兽大学',
                'is_985': null,
                'id': '3fab3823dd3424a1liSrGw~~'
            }
        ],
        'parentId': null,
        'copyId': '',
        'sort': ''
    }
};

export const configList = {
    'group-interview_assessment_b838-7510-4d4e-8985-e609-evaluation': {
        'id': 'group-interview_assessment_b838-7510-4d4e-8985-e609-evaluation',
        'type': 'evaluation',
        'role': 'group-interview',
        'parentId': 'group-interview_assessment_b838-7510-4d4e-8985-e609',
        'hidden': false
    },
    'group-interview_assessment_b838-7510-4d4e-8985-e609': {
        'id': 'group-interview_assessment_b838-7510-4d4e-8985-e609',
        'role': 'group-interview',
        'type': 'assessment',
        'title': '评估意见',
        'titleLimit': 1000,
        'hasInstructions': false,
        'instructions': '请输入题干说明',
        'instructionsLimit': 1000,
        'showSerial': false,
        'serialStrategy': 1,
        'hidden': false,
        'required': false,
        'multiple': false,
        'labelName': '其他',
        'labelTime': '访谈时间'
    },
    'group-interview_collaboration_d365-54f6-4860-b33e-e38d-evaluation': {
        'id': 'group-interview_collaboration_d365-54f6-4860-b33e-e38d-evaluation',
        'type': 'evaluation',
        'role': 'group-interview',
        'parentId': 'group-interview_collaboration_d365-54f6-4860-b33e-e38d',
        'hidden': false
    },
    'group-interview_collaboration_d365-54f6-4860-b33e-e38d': {
        'id': 'group-interview_collaboration_d365-54f6-4860-b33e-e38d',
        'parentId': null,
        'role': 'group-interview',
        'type': 'collaboration',
        'title': '协作方角色',
        'titleLimit': 1000,
        'hasInstructions': false,
        'instructions': '请输入题干说明',
        'instructionsLimit': 1000,
        'showSerial': false,
        'serialStrategy': 1,
        'hidden': false,
        'required': false,
        'multiple': true,
        'labelName': '协作人员',
        'labelTime': '访谈时间'
    },
    'group-interview_junior_1163-f475-4dca-abf1-7269-evaluation': {
        'id': 'group-interview_junior_1163-f475-4dca-abf1-7269-evaluation',
        'type': 'evaluation',
        'role': 'group-interview',
        'parentId': 'group-interview_junior_1163-f475-4dca-abf1-7269',
        'hidden': false
    },
    'group-interview_junior_1163-f475-4dca-abf1-7269': {
        'id': 'group-interview_junior_1163-f475-4dca-abf1-7269',
        'parentId': null,
        'role': 'group-interview',
        'type': 'junior',
        'title': '下级角色',
        'titleLimit': 1000,
        'hasInstructions': false,
        'instructions': '请输入题干说明',
        'instructionsLimit': 1000,
        'showSerial': false,
        'serialStrategy': 1,
        'hidden': false,
        'required': false,
        'multiple': false,
        'labelName': '下级',
        'labelTime': '访谈时间'
    },
    'basic_radio_9ecc-17d8-414d-92eb-07e0': {
        'id': 'basic_radio_9ecc-17d8-414d-92eb-07e0',
        'parentId': 'group-interview_collaboration_d365-54f6-4860-b33e-e38d',
        'code': '',
        'role': 'basic-choose',
        'roleName': '',
        'type': 'radio',
        'title': '请选择一个选项',
        'titleLimit': 1000,
        'hasInstructions': false,
        'instructions': '请输入题干说明',
        'instructionsLimit': 1000,
        'showSerial': false,
        'serialStrategy': 1,
        'hidden': false,
        'required': false,
        'options': [
            {
                'code': 'options_b6a9-81eb-4445-9e0d-ae56',
                'label': '选项1',
                'hasExplain': false,
                'explain': '请输入选项说明',
                'explainLimit': 1000,
                'hasExtra': false,
                'extra': '',
                'hasExtraLimit': false,
                'extraRequired': true,
                'extraLimit': 9999,
                'extraRule': -1,
                'ruleName': ''
            },
            {
                'code': 'options_f01c-7bc3-45fd-abe0-be19',
                'label': '选项2',
                'hasExplain': false,
                'explain': '请输入选项说明',
                'explainLimit': 1000,
                'hasExtra': false,
                'extra': '',
                'hasExtraLimit': false,
                'extraRequired': true,
                'extraLimit': 9999,
                'extraRule': -1,
                'ruleName': ''
            }
        ]
    },
    'basic_radio_a5ee-456f-4641-8d2d-59f4': {
        'id': 'basic_radio_a5ee-456f-4641-8d2d-59f4',
        'parentId': 'group-interview_junior_1163-f475-4dca-abf1-7269',
        'code': '',
        'role': 'basic-choose',
        'roleName': '',
        'type': 'radio',
        'title': '请选择一个选项',
        'titleLimit': 1000,
        'hasInstructions': false,
        'instructions': '请输入题干说明',
        'instructionsLimit': 1000,
        'showSerial': false,
        'serialStrategy': 1,
        'hidden': false,
        'required': false,
        'options': [
            {
                'code': 'options_0714-02d8-45f5-9144-85d2',
                'label': '选项1',
                'hasExplain': false,
                'explain': '请输入选项说明',
                'explainLimit': 1000,
                'hasExtra': false,
                'extra': '',
                'hasExtraLimit': false,
                'extraRequired': true,
                'extraLimit': 9999,
                'extraRule': -1,
                'ruleName': ''
            },
            {
                'code': 'options_241a-1ad4-4e12-9150-8eba',
                'label': '选项2',
                'hasExplain': false,
                'explain': '请输入选项说明',
                'explainLimit': 1000,
                'hasExtra': false,
                'extra': '',
                'hasExtraLimit': false,
                'extraRequired': true,
                'extraLimit': 9999,
                'extraRule': -1,
                'ruleName': ''
            }
        ]
    },
    'group-interview_oneself_c3e2-14fd-49ae-a500-726b': {
        'id': 'group-interview_oneself_c3e2-14fd-49ae-a500-726b',
        'parentId': null,
        'role': 'group-interview',
        'type': 'oneself',
        'title': '本人角色',
        'titleLimit': 1000,
        'hasInstructions': false,
        'instructions': '请输入题干说明',
        'instructionsLimit': 1000,
        'showSerial': false,
        'serialStrategy': 1,
        'hidden': false,
        'required': false,
        'multiple': false,
        'labelName': '员工姓名',
        'labelTime': '访谈时间'
    },
    'basic_fill_1bef-b022-4916-9fae-6dc4': {
        'id': 'basic_fill_1bef-b022-4916-9fae-6dc4',
        'parentId': 'group-interview_oneself_c3e2-14fd-49ae-a500-726b',
        'code': '',
        'role': 'basic-write',
        'roleName': '',
        'type': 'fill',
        'title': '请填写本项内容',
        'titleLimit': 1000,
        'hasInstructions': false,
        'instructions': '请输入题干说明',
        'instructionsLimit': 1000,
        'showSerial': false,
        'serialStrategy': 1,
        'hidden': false,
        'required': false,
        'size': 'L',
        'fillRule': -1,
        'ruleName': '',
        'lengthMin': null,
        'lengthMax': null,
        'placeholder': '',
        'placeholderLimit': 1000
    },
    'basic_score_609b-b9ac-443a-a405-dbc5': {
        'id': 'basic_score_609b-b9ac-443a-a405-dbc5',
        'parentId': 'group-interview_assessment_b838-7510-4d4e-8985-e609',
        'code': '',
        'role': 'basic-score',
        'roleName': '',
        'type': 'score',
        'title': '请给本项打分',
        'titleLimit': 1000,
        'hasInstructions': false,
        'instructions': '请输入题干说明',
        'instructionsLimit': 1000,
        'showSerial': false,
        'serialStrategy': 1,
        'hidden': false,
        'required': false,
        'scoreMin': 0,
        'scoreMax': 5,
        'scoreTipsLeft': '',
        'scoreTipsCenter': '',
        'scoreTipsRight': ''
    },
    ...{"basic_remark_aa30-5f18-490b-98ff-1338":{"id":"basic_remark_aa30-5f18-490b-98ff-1338","parentId":null,"code":"","role":"basic-unclassified","roleName":"","type":"remark","title":"备注说明","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false},"basic_attachment_d826-0230-4d3a-b533-a948":{"id":"basic_attachment_d826-0230-4d3a-b533-a948","parentId":null,"code":"","role":"basic-unclassified","roleName":"","type":"attachment","title":"请上传附件","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false,"suffix":[".png",".jpg",".jpeg",".doc",".docx",".pdf",".xls",".xlsx"],"singleSizeLimit":10,"totalLimit":10}},
    ...{"basic_columns_7d2f-5432-483e-8a73-9ecc":{"id":"basic_columns_7d2f-5432-483e-8a73-9ecc","parentId":null,"code":"","role":"basic-layout","roleName":"","type":"columns","title":"分栏","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false},"basic_fill_2424-3e5d-4d70-9ba0-343e":{"id":"basic_fill_2424-3e5d-4d70-9ba0-343e","parentId":"basic_columns_7d2f-5432-483e-8a73-9ecc","code":"","role":"basic-write","roleName":"","type":"fill","title":"请填写本项内容","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false,"size":"L","fillRule":-1,"ruleName":"","lengthMin":null,"lengthMax":null,"placeholder":"","placeholderLimit":1000},"basic_radio_706a-83b8-498d-bd89-4b5f":{"id":"basic_radio_706a-83b8-498d-bd89-4b5f","parentId":"basic_columns_7d2f-5432-483e-8a73-9ecc","code":"","role":"basic-choose","roleName":"","type":"radio","title":"请选择一个选项","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false,"options":[{"code":"options_e82a-4142-4359-a82a-bbec","label":"选项1","hasExplain":false,"explain":"请输入选项说明","explainLimit":1000,"hasExtra":false,"extra":"","hasExtraLimit":false,"extraRequired":true,"extraLimit":9999,"extraRule":-1,"ruleName":""},{"code":"options_3871-6214-4177-b6f5-78c9","label":"选项2","hasExplain":false,"explain":"请输入选项说明","explainLimit":1000,"hasExtra":false,"extra":"","hasExtraLimit":false,"extraRequired":true,"extraLimit":9999,"extraRule":-1,"ruleName":""}]},"basic_checkbox_d946-de86-410f-8459-edac":{"id":"basic_checkbox_d946-de86-410f-8459-edac","parentId":"basic_columns_7d2f-5432-483e-8a73-9ecc","code":"","role":"basic-choose","roleName":"","type":"checkbox","title":"请选择以下选项（多选）","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false,"options":[{"code":"options_8790-13f1-4c01-99ab-2466","label":"选项1","hasExplain":false,"explain":"请输入选项说明","explainLimit":1000,"hasExtra":false,"extra":"","hasExtraLimit":false,"extraRequired":true,"extraLimit":9999,"extraRule":-1,"ruleName":""},{"code":"options_6693-5731-4038-8198-122b","label":"选项2","hasExplain":false,"explain":"请输入选项说明","explainLimit":1000,"hasExtra":false,"extra":"","hasExtraLimit":false,"extraRequired":true,"extraLimit":9999,"extraRule":-1,"ruleName":""}],"selectedMin":-1,"selectedMax":-1},"basic_fill_cfb9-6106-45d3-95dd-f582":{"id":"basic_fill_cfb9-6106-45d3-95dd-f582","parentId":"basic_columns_7d2f-5432-483e-8a73-9ecc","code":"","role":"basic-write","roleName":"","type":"fill","title":"请填写本项内容","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false,"size":"L","fillRule":-1,"ruleName":"","lengthMin":null,"lengthMax":null,"placeholder":"","placeholderLimit":1000},"basic_fill_0469-a19a-428c-98b0-7e4e":{"id":"basic_fill_0469-a19a-428c-98b0-7e4e","parentId":"basic_columns_7d2f-5432-483e-8a73-9ecc","code":"","role":"basic-write","roleName":"","type":"fill","title":"请填写本项内容","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false,"size":"L","fillRule":-1,"ruleName":"","lengthMin":null,"lengthMax":null,"placeholder":"","placeholderLimit":1000},"basic_fill_9124-1f1b-46f2-bc2a-f5e5":{"id":"basic_fill_9124-1f1b-46f2-bc2a-f5e5","parentId":"basic_columns_7d2f-5432-483e-8a73-9ecc","code":"","role":"basic-write","roleName":"","type":"fill","title":"请填写本项内容","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false,"size":"L","fillRule":-1,"ruleName":"","lengthMin":null,"lengthMax":null,"placeholder":"","placeholderLimit":1000},"copy_basic-write_fill_7042-6aae-4f94-ac55-c26b":{"id":"copy_basic-write_fill_7042-6aae-4f94-ac55-c26b","parentId":"basic_columns_7d2f-5432-483e-8a73-9ecc","code":"","role":"basic-write","roleName":"","type":"fill","title":"请填写本项内容","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false,"size":"L","fillRule":-1,"ruleName":"不限","lengthMin":null,"lengthMax":null,"placeholder":"","placeholderLimit":1000}},
    ...{"group-interview_assessment_5cf2-ccc9-4af0-91ee-d927-evaluation":{"id":"group-interview_assessment_5cf2-ccc9-4af0-91ee-d927-evaluation","type":"evaluation","role":"group-interview","parentId":"group-interview_assessment_5cf2-ccc9-4af0-91ee-d927","hidden":false},"group-interview_assessment_5cf2-ccc9-4af0-91ee-d927":{"id":"group-interview_assessment_5cf2-ccc9-4af0-91ee-d927","role":"group-interview","type":"assessment","title":"评估意见","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false,"multiple":false,"labelName":"其他","labelTime":"访谈时间"},"relation-interview-basicinfo-multiple_a1e1-637a-4f92-bcad-6d39|user_info_change":{"id":"relation-interview-basicinfo-multiple_a1e1-637a-4f92-bcad-6d39|user_info_change","role":"relation-interview-basicinfo-multiple","type":"user_info_change","title":"异动信息","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false,"multiple":true,"dataFilter":[[{"fieldGroupId":"ffcd10ededce31fdmik~","fieldGroupName":"","fieldGroupStatus":0,"fieldId":"c73fe72ceeaa972fkiyo","fieldName":"异动生效日期","fieldStatus":0,"filedConfig":{"fieldType":1018,"maxLength":"","dictType":"","defaultValue":"","regulation":"yyyy-MM-dd","remark":"","multiple":false,"isRange":false,"url":"","isRequired":true},"ruleId":"6","ruleName":"≠","ruleStatus":0,"value":"2022-08-25","metaValue":"2022-08-25","addedValue":"","metaAddedValue":"","status":0,"addedStatus":0,"fieldVOList":[{"id":"c73fe72ceeaa972fkiyo","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动生效日期","fieldType":1018,"dictType":"","regulation":"yyyy-MM-dd","config":{"fieldType":1018,"maxLength":"","dictType":"","defaultValue":"","regulation":"yyyy-MM-dd","remark":"","multiple":false,"isRange":false,"url":"","isRequired":true},"sort":3,"tableName":"user_info_change","fieldName":"effect_date","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"856e06475f693422kiyv","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动说明","fieldType":1002,"dictType":"","regulation":"","config":{"fieldType":1002,"maxLength":"500","dictType":"","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":false},"sort":4,"tableName":"user_info_change","fieldName":"remark","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":0,"enabled":1},{"id":"e07e60ab8d248bcckiyu","fieldGroupId":"a581fea6fc88bb33ki8~","name":"是否设置见习期","fieldType":1012,"dictType":"","regulation":"","config":{"fieldType":1012,"maxLength":"","dictType":"","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":false},"sort":5,"tableName":"user_info_change","fieldName":"is_probation","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":0,"enabled":1},{"id":"39312f3a461954aekiyt","fieldGroupId":"a581fea6fc88bb33ki8~","name":"见习开始日期","fieldType":1018,"dictType":"","regulation":"yyyy-MM-dd","config":{"fieldType":1018,"maxLength":"","dictType":"","defaultValue":"","regulation":"yyyy-MM-dd","remark":"","multiple":false,"isRange":false,"url":"","isRequired":false},"sort":6,"tableName":"user_info_change","fieldName":"probation_start_date","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":0,"enabled":1},{"id":"5adac92b718698dakiys","fieldGroupId":"a581fea6fc88bb33ki8~","name":"见习应结束日期","fieldType":1018,"dictType":"","regulation":"yyyy-MM-dd","config":{"fieldType":1018,"maxLength":"","dictType":"","defaultValue":"","regulation":"yyyy-MM-dd","remark":"","multiple":false,"isRange":false,"url":"","isRequired":false},"sort":7,"tableName":"user_info_change","fieldName":"probation_end_date","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":0,"enabled":1},{"id":"2aac270e13f8ed21kiWr","fieldGroupId":"a581fea6fc88bb33ki8~","name":"见习实际结束日期","fieldType":1018,"dictType":"","regulation":"yyyy-MM-dd","config":{"fieldType":1018,"maxLength":"","dictType":"","defaultValue":"","regulation":"yyyy-MM-dd","remark":"","multiple":false,"isRange":false,"url":"","isRequired":false},"sort":8,"tableName":"user_info_change","fieldName":"probation_real_end_date","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":0,"enabled":1},{"id":"28a3565470534790kiyj","fieldGroupId":"a581fea6fc88bb33ki8~","name":"见习期限(月)","fieldType":1005,"dictType":"","regulation":"3.0","config":{"fieldType":1005,"maxLength":"","dictType":"","defaultValue":"","regulation":"3.0","remark":"","multiple":false,"isRange":false,"url":"","isRequired":false},"sort":9,"tableName":"user_info_change","fieldName":"probation_duration","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":0,"enabled":1},{"id":"2a6d60db54b32017kiyi","fieldGroupId":"a581fea6fc88bb33ki8~","name":"见习岗位","fieldType":1002,"dictType":"","regulation":"","config":{"fieldType":1002,"maxLength":"500","dictType":"","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":false},"sort":10,"tableName":"user_info_change","fieldName":"probation_position","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":0,"enabled":1},{"id":"669ae4c045790100ki2r","fieldGroupId":"a581fea6fc88bb33ki8~","name":"见习转正说明","fieldType":1002,"dictType":"","regulation":"","config":{"fieldType":1002,"maxLength":"500","dictType":"","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":false},"sort":11,"tableName":"user_info_change","fieldName":"probation_content","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":0,"enabled":1},{"id":"e3edbfa775aa22f5kiWq","fieldGroupId":"a581fea6fc88bb33ki8~","name":"见习转正类型","fieldType":1003,"dictType":"positive_type","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"positive_type","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":false},"sort":12,"tableName":"user_info_change","fieldName":"probation_positive_type","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":0,"enabled":1},{"id":"fd616288b93b7bbckSyp","fieldGroupId":"a581fea6fc88bb33ki8~","name":"见习延长转正日期","fieldType":1018,"dictType":"","regulation":"yyyy-MM-dd","config":{"fieldType":1018,"maxLength":"","dictType":"","defaultValue":"","regulation":"yyyy-MM-dd","remark":"","multiple":false,"isRange":false,"url":"","isRequired":false},"sort":12,"tableName":"user_info_change","fieldName":"probation_extend_positive_time","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":0,"enabled":1},{"id":"62129988777c5f4eki2q","fieldGroupId":"a581fea6fc88bb33ki8~","name":"是否退出/加入邮箱群组","fieldType":1012,"dictType":"","regulation":"","config":{"fieldType":1012,"maxLength":"","dictType":"","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":false},"sort":14,"tableName":"user_info_change","fieldName":"is_change_email_group","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":0,"enabled":1},{"id":"420b4959d41d96f5ki2p","fieldGroupId":"a581fea6fc88bb33ki8~","name":"部门负责人","fieldType":1012,"dictType":"","regulation":"","config":{"fieldType":1012,"maxLength":"","dictType":"","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":true},"sort":15,"tableName":"user_info_change","fieldName":"is_tl","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"197a8fe98d727b6fki2o","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动前部门","fieldType":1013,"dictType":"","regulation":"","config":{"fieldType":1013,"maxLength":"","dictType":"","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":true},"sort":16,"tableName":"user_info_change","fieldName":"before_dept_id","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"03f15a62962b4a61kSir","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动前管理序列","fieldType":1003,"dictType":"manage_seq","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"manage_seq","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"/api/sys/dict/manageSeq/list.json","isRequired":true},"sort":17,"tableName":"user_info_change","fieldName":"before_manage_seq","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"f913e23721edf119ki2v","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动前专业序列","fieldType":1003,"dictType":"seq","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"seq","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"/api/sys/dict/seq/list.json","isRequired":true},"sort":17,"tableName":"user_info_change","fieldName":"before_seq","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"92d1f6b716f163afkSiq","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动前管理职级","fieldType":1003,"dictType":"manage_seq","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"manage_seq","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"/api/sys/dict/manageLevel/list.json","isRequired":true},"sort":18,"tableName":"user_info_change","fieldName":"before_manage_seq_level","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"2c3ce3fb80f2901eki2u","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动前专业职级","fieldType":1003,"dictType":"seq","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"seq","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"/api/sys/dict/level/list.json","isRequired":true},"sort":18,"tableName":"user_info_change","fieldName":"before_seq_level","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"0c2765b96d3cc464ki2t","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动前岗位","fieldType":1001,"dictType":"","regulation":"","config":{"fieldType":1001,"maxLength":"200","dictType":"","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":true},"sort":19,"tableName":"user_info_change","fieldName":"before_position","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"f69996c8d1bdeb2dkSip","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动前管理子序列","fieldType":1003,"dictType":"manage_seq_sub","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"manage_seq_sub","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"/api/sys/dict/manageSub/list.json","isRequired":true},"sort":20,"tableName":"user_info_change","fieldName":"before_manage_seq_sub","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"e2666cc5923634f0ki2s","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动前专业子序列","fieldType":1003,"dictType":"seq_sub","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"seq_sub","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"/api/sys/dict/sub/list.json","isRequired":true},"sort":20,"tableName":"user_info_change","fieldName":"before_seq_sub","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"02ba6bd338bd9ddekSio","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动前管理标准岗位","fieldType":1003,"dictType":"manage_position","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"manage_position","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"/api/sys/dict/managePosition/list.json","isRequired":true},"sort":21,"tableName":"user_info_change","fieldName":"before_manage_std_position","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"4021a9ce066edaceki2j","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动前专业标准岗位","fieldType":1003,"dictType":"position","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"position","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"/api/sys/dict/position/list.json","isRequired":true},"sort":21,"tableName":"user_info_change","fieldName":"before_std_position","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"108673c684e51baaki2i","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动前汇报人","fieldType":1015,"dictType":"","regulation":"","config":{"fieldType":1015,"maxLength":"","dictType":"","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":true},"sort":22,"tableName":"user_info_change","fieldName":"before_reporter_id","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"becf63ea28bed58ekiWs","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动前汇报人2","fieldType":1015,"dictType":"","regulation":"","config":{"fieldType":1015,"maxLength":"","dictType":"","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":false},"sort":23,"tableName":"user_info_change","fieldName":"before_reporter_id2","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":0,"enabled":1},{"id":"5ddc770020e33c2cki6r","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动前工作地点","fieldType":1003,"dictType":"workplace","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"workplace","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":true},"sort":24,"tableName":"user_info_change","fieldName":"before_workplace","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"d11de97a0723584fki6q","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动后部门","fieldType":1013,"dictType":"","regulation":"","config":{"fieldType":1013,"maxLength":"","dictType":"","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":true},"sort":25,"tableName":"user_info_change","fieldName":"after_dept_id","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"2fb6ad28def83235kSiv","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动后管理序列","fieldType":1003,"dictType":"manage_seq","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"manage_seq","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"/api/sys/dict/manageSeq/list.json","isRequired":true},"sort":26,"tableName":"user_info_change","fieldName":"after_manage_seq","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"e1687c3fb6e3a79fki6p","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动后专业序列","fieldType":1003,"dictType":"seq","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"seq","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"/api/sys/dict/seq/list.json","isRequired":true},"sort":26,"tableName":"user_info_change","fieldName":"after_seq","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"61f3472d282cf54aki6o","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动后专业职级","fieldType":1003,"dictType":"seq","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"seq","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"/api/sys/dict/level/list.json","isRequired":true},"sort":27,"tableName":"user_info_change","fieldName":"after_seq_level","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"ad10b159cb23c00ckSiu","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动后管理职级","fieldType":1003,"dictType":"manage_seq","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"manage_seq","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"/api/sys/dict/manageLevel/list.json","isRequired":true},"sort":27,"tableName":"user_info_change","fieldName":"after_manage_seq_level","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"915d974804edd193ki6v","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动后岗位","fieldType":1001,"dictType":"","regulation":"","config":{"fieldType":1001,"maxLength":"200","dictType":"","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":true},"sort":28,"tableName":"user_info_change","fieldName":"after_position","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"e0116d336b0c71ddki6u","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动后专业子序列","fieldType":1003,"dictType":"seq_sub","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"seq_sub","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"/api/sys/dict/sub/list.json","isRequired":true},"sort":29,"tableName":"user_info_change","fieldName":"after_seq_sub","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"8ab86d165fdc4cd4kSit","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动后管理子序列","fieldType":1003,"dictType":"manage_seq_sub","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"manage_seq_sub","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"/api/sys/dict/manageSub/list.json","isRequired":true},"sort":29,"tableName":"user_info_change","fieldName":"after_manage_seq_sub","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"bed8bc9008fda86bkSis","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动后管理标准岗位","fieldType":1003,"dictType":"manage_position","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"manage_position","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"/api/sys/dict/managePosition/list.json","isRequired":true},"sort":30,"tableName":"user_info_change","fieldName":"after_manage_std_position","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"dfde4eb38d0f0fdbki6t","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动后专业标准岗位","fieldType":1003,"dictType":"position","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"position","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"/api/sys/dict/position/list.json","isRequired":true},"sort":30,"tableName":"user_info_change","fieldName":"after_std_position","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"88272fc9ac0733b5ki6s","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动后汇报人","fieldType":1015,"dictType":"","regulation":"","config":{"fieldType":1015,"maxLength":"","dictType":"","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":true},"sort":31,"tableName":"user_info_change","fieldName":"after_reporter_id","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"4733e64daa7a893fkiWp","fieldGroupId":"a581fea6fc88bb33ki8~","name":"特殊情况说明","fieldType":1002,"dictType":"","regulation":"","config":{"fieldType":1002,"maxLength":"500","dictType":"","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":false},"sort":31,"tableName":"user_info_change","fieldName":"probation_remark","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":0,"enabled":1},{"id":"a5c5f944f996caebkiWj","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动后汇报人2","fieldType":1015,"dictType":"","regulation":"","config":{"fieldType":1015,"maxLength":"","dictType":"","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":false},"sort":32,"tableName":"user_info_change","fieldName":"after_reporter_id2","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":0,"enabled":1},{"id":"20c999b5396bc385ki6j","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动后工作地点","fieldType":1003,"dictType":"workplace","regulation":"","config":{"fieldType":1003,"maxLength":"","dictType":"workplace","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":true},"sort":33,"tableName":"user_info_change","fieldName":"after_workplace","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"eaa4b2f1cbe2b185kiWu","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动前部门名","fieldType":1001,"dictType":"","regulation":"","config":{"fieldType":1001,"maxLength":"512","dictType":"","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":true},"sort":34,"tableName":"user_info_change","fieldName":"before_dept_name","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1},{"id":"f19c72db7762e2c7kiWt","fieldGroupId":"a581fea6fc88bb33ki8~","name":"异动后部门名","fieldType":1001,"dictType":"","regulation":"","config":{"fieldType":1001,"maxLength":"512","dictType":"","defaultValue":"","regulation":"","remark":"","multiple":false,"isRange":false,"url":"","isRequired":true},"sort":35,"tableName":"user_info_change","fieldName":"after_dept_name","batchUpdate":0,"isCalc":0,"isEncrypt":0,"isRequired":1,"enabled":1}],"leafValue":[]}]],"fieldsList":[{"code":"remark","label":"异动说明"},{"code":"effect_date","label":"异动生效日期"},{"code":"after_position","label":"异动后岗位"},{"code":"after_manage_seq","label":"异动后管理序列"},{"code":"after_manage_seq_level","label":"异动后管理职级"},{"code":"after_std_position","label":"异动后专业标准岗位"},{"code":"before_dept_name","label":"异动前部门名"},{"code":"before_position","label":"异动前岗位"},{"code":"before_manage_seq","label":"异动前管理序列"},{"code":"before_manage_seq_level","label":"异动前管理职级"},{"code":"before_seq","label":"异动前专业序列"},{"code":"before_seq_level","label":"异动前专业职级"},{"code":"before_std_position","label":"异动前专业标准岗位"}],"fillStyle":2,"printStyle":1},"relation-interview-basicinfo-multiple_60bf-cf46-4da9-8037-d432|user_info_edu_exp":{"id":"relation-interview-basicinfo-multiple_60bf-cf46-4da9-8037-d432|user_info_edu_exp","parentId":null,"role":"relation-interview-basicinfo-multiple","type":"user_info_edu_exp","title":"教育经历","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false,"multiple":true,"dataFilter":[],"fieldsList":[{"code":"start_date","label":"教育经历开始时间"},{"code":"end_date","label":"教育经历结束时间"},{"code":"school_name","label":"毕业院校"},{"code":"study_type","label":"学习形式"},{"code":"major_name","label":"专业名称"},{"code":"academic","label":"获得学历"},{"code":"degree","label":"学位"},{"code":"is_985","label":"是否985高校"},{"code":"is_211","label":"是否211高校"},{"code":"is_highest","label":"是否最高学历"}],"fillStyle":1,"printStyle":1},"relation-interview-basicinfo-single_de38-4e49-454f-bf38-5d06|user_info|name":{"id":"relation-interview-basicinfo-single_de38-4e49-454f-bf38-5d06|user_info|name","parentId":null,"role":"relation-interview-basicinfo-single","type":"user_info|name","title":"姓名","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false},"relation-interview-basicinfo-single_8756-20af-4de0-9083-2eca|user_info|number":{"id":"relation-interview-basicinfo-single_8756-20af-4de0-9083-2eca|user_info|number","parentId":null,"role":"relation-interview-basicinfo-single","type":"user_info|number","title":"员工编号","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false},"relation-interview-basicinfo-single_9726-8f28-4df6-9e09-6203|user_info|join_date":{"id":"relation-interview-basicinfo-single_9726-8f28-4df6-9e09-6203|user_info|join_date","parentId":null,"role":"relation-interview-basicinfo-single","type":"user_info|join_date","title":"入职日期","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false},"relation-interview-basicinfo-single_a306-0d11-4117-93e2-7ed5|user_info|probation_code":{"id":"relation-interview-basicinfo-single_a306-0d11-4117-93e2-7ed5|user_info|probation_code","parentId":null,"role":"relation-interview-basicinfo-single","type":"user_info|probation_code","title":"试用期限","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false},"relation-interview-basicinfo-single_1b83-9ee3-44cc-a810-0e12|user_info_job|dept_id":{"id":"relation-interview-basicinfo-single_1b83-9ee3-44cc-a810-0e12|user_info_job|dept_id","parentId":null,"role":"relation-interview-basicinfo-single","type":"user_info_job|dept_id","title":"部门","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false},"relation-interview-basicinfo-single_6c10-8ddd-452e-98bb-887c|user_info_job|position":{"id":"relation-interview-basicinfo-single_6c10-8ddd-452e-98bb-887c|user_info_job|position","parentId":null,"role":"relation-interview-basicinfo-single","type":"user_info_job|position","title":"岗位","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false},"relation-interview-basicinfo-single_4ee6-b2d6-4f41-adb0-5462|user_info_job|seq":{"id":"relation-interview-basicinfo-single_4ee6-b2d6-4f41-adb0-5462|user_info_job|seq","parentId":null,"role":"relation-interview-basicinfo-single","type":"user_info_job|seq","title":"专业序列","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false},"relation-interview-basicinfo-single_52d5-97b8-410d-808d-5c81|user_info_job|seq_level":{"id":"relation-interview-basicinfo-single_52d5-97b8-410d-808d-5c81|user_info_job|seq_level","parentId":null,"role":"relation-interview-basicinfo-single","type":"user_info_job|seq_level","title":"专业职级","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false},"relation-interview-basicinfo-single_6356-4a8a-407e-9580-c4e0|user_info_job|std_position":{"id":"relation-interview-basicinfo-single_6356-4a8a-407e-9580-c4e0|user_info_job|std_position","parentId":null,"role":"relation-interview-basicinfo-single","type":"user_info_job|std_position","title":"专业标准岗位","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false},"relation-interview-basicinfo-single_65a4-56a3-4adc-a559-8502|user_info_job|manage_seq":{"id":"relation-interview-basicinfo-single_65a4-56a3-4adc-a559-8502|user_info_job|manage_seq","parentId":null,"role":"relation-interview-basicinfo-single","type":"user_info_job|manage_seq","title":"管理序列","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false},"relation-interview-basicinfo-single_ec36-50b7-47ae-9291-c84c|user_info_job|manage_seq_level":{"id":"relation-interview-basicinfo-single_ec36-50b7-47ae-9291-c84c|user_info_job|manage_seq_level","parentId":null,"role":"relation-interview-basicinfo-single","type":"user_info_job|manage_seq_level","title":"管理职级","titleLimit":1000,"hasInstructions":false,"instructions":"请输入题干说明","instructionsLimit":1000,"showSerial":false,"serialStrategy":1,"hidden":false,"required":false}}
};

export const viewerList = [
    ...[{"id":"basic_remark_aa30-5f18-490b-98ff-1338"},{"id":"basic_attachment_d826-0230-4d3a-b533-a948"}],
    ...[{"id":"basic_columns_7d2f-5432-483e-8a73-9ecc","children":[{"id":"basic_checkbox_d946-de86-410f-8459-edac","splits":25},{"id":"basic_fill_2424-3e5d-4d70-9ba0-343e","splits":25},{"id":"copy_basic-write_fill_7042-6aae-4f94-ac55-c26b","splits":25,"parentId":"basic_columns_7d2f-5432-483e-8a73-9ecc","copyId":"basic_fill_2424-3e5d-4d70-9ba0-343e"},{"id":"basic_radio_706a-83b8-498d-bd89-4b5f","splits":25},{"id":"basic_fill_0469-a19a-428c-98b0-7e4e","splits":50},{"id":"basic_fill_cfb9-6106-45d3-95dd-f582","splits":50},{"id":"basic_fill_9124-1f1b-46f2-bc2a-f5e5","splits":100}]}],
    {"id":"group-interview_assessment_5cf2-ccc9-4af0-91ee-d927","children":[{"id":"group-interview_assessment_5cf2-ccc9-4af0-91ee-d927-evaluation"}]},{"id":"relation-interview-basicinfo-single_de38-4e49-454f-bf38-5d06|user_info|name"},{"id":"relation-interview-basicinfo-single_8756-20af-4de0-9083-2eca|user_info|number"},{"id":"relation-interview-basicinfo-single_9726-8f28-4df6-9e09-6203|user_info|join_date"},{"id":"relation-interview-basicinfo-single_a306-0d11-4117-93e2-7ed5|user_info|probation_code"},{"id":"relation-interview-basicinfo-single_1b83-9ee3-44cc-a810-0e12|user_info_job|dept_id"},{"id":"relation-interview-basicinfo-single_52d5-97b8-410d-808d-5c81|user_info_job|seq_level"},{"id":"relation-interview-basicinfo-single_6356-4a8a-407e-9580-c4e0|user_info_job|std_position"},{"id":"relation-interview-basicinfo-single_ec36-50b7-47ae-9291-c84c|user_info_job|manage_seq_level"},{"id":"relation-interview-basicinfo-single_65a4-56a3-4adc-a559-8502|user_info_job|manage_seq"},{"id":"relation-interview-basicinfo-multiple_a1e1-637a-4f92-bcad-6d39|user_info_change"},{"id":"relation-interview-basicinfo-single_4ee6-b2d6-4f41-adb0-5462|user_info_job|seq"},{"id":"relation-interview-basicinfo-single_6c10-8ddd-452e-98bb-887c|user_info_job|position"},{"id":"relation-interview-basicinfo-multiple_60bf-cf46-4da9-8037-d432|user_info_edu_exp"},
    {
        'id': 'group-interview_assessment_b838-7510-4d4e-8985-e609',
        'children': [
            {
                'id': 'basic_score_609b-b9ac-443a-a405-dbc5'
            },
            {
                'id': 'group-interview_assessment_b838-7510-4d4e-8985-e609-evaluation'
            }
        ]
    },
    {
        'id': 'group-interview_oneself_c3e2-14fd-49ae-a500-726b',
        'children': [
            {
                'id': 'basic_fill_1bef-b022-4916-9fae-6dc4'
            }
        ]
    },
    {
        'id': 'group-interview_collaboration_d365-54f6-4860-b33e-e38d',
        'children': [
            {
                'id': 'basic_radio_9ecc-17d8-414d-92eb-07e0'
            },
            {
                'id': 'group-interview_collaboration_d365-54f6-4860-b33e-e38d-evaluation'
            }
        ]
    },
    {
        'id': 'group-interview_junior_1163-f475-4dca-abf1-7269',
        'children': [
            {
                'id': 'basic_radio_a5ee-456f-4641-8d2d-59f4'
            },
            {
                'id': 'group-interview_junior_1163-f475-4dca-abf1-7269-evaluation'
            }
        ]
    }
];


export const getFiled = {
    'success': true,
    'host': null,
    '_csrf': null,
    'root': [
        {
            'code': 'multi', 
            'tableName': 'user_info_contract',
            'fieldCodeValueMap': [
                {
                    'start_date': '2016-04-18', //控件取值 multi-user_info_contract-start_date
                    'end_date': '2020-04-17',
                    'id': '2777dace81c682e6kiutHQ~~'
                }
            ],
            'multi': true //是否多子集，多子集的话，根据fieldCodeValueMap遍历填充表格
        },
        {
            'code': 'multi',
            'tableName': 'user_info_edu_exp',
            'fieldCodeValueMap': [
                {
                    'start_date': null,
                    'school_name': '枣庄学院',
                    'is_985': '否',
                    'id': '6909323412a0b373ly6qGg~~'
                },
                {
                    'start_date': null,
                    'school_name': '怪兽大学',
                    'is_985': null,
                    'id': '3fab3823dd3424a1liSrGw~~'
                }
            ],
            'multi': true
        },
        {
            'code': 'single',
            'tableName': 'user_info_job',
            'fieldCodeValueMap': [
                {
                    'dept_id': 'BZL/店长直聘线/商业/北京商业一组',
                    'position': '是否',
                    'seq': 'O序列',
                    'id': '2093da0e6d0a33d0lSupHA~~'
                }
            ],
            'multi': false
        },
        {
            'code': 'single',
            'tableName': 'user_info',
            'fieldCodeValueMap': [
                {
                    'name': '刘亚平',
                    'join_date': '2020-12-01',
                    'id': '8c54dc11309031e4ly6uGvs~',
                    'probation_code': 'rewrewqrewqrqw'
                }
            ],
            'multi': false
        },
        {
            'code': 'approve',
            'tableName': 'user_info_leave_job',
            'fieldCodeValueMap': [{
                'last_day': '2022-10-04'
            }],
            'multi': false
        },
        {
            'code': 'interview',
            'tableName': 'interview_info',
            'fieldCodeValueMap': [
                {
                    'interviewer_id': '王晓臣'
                }
            ],
            'multi': false
        },
        {
            'code': 'multi',
            'tableName': 'user_info_change',
            'fieldCodeValueMap': [
                {
                    'effect_date': '2021-08-13',
                    'before_dept_id': 'BZL/公共资源/技术/测试中心/测试三组',
                    'before_position': '顶奢',
                    'id': 'b6d46100ddda7019lSWtGQ~~'
                },
                {
                    'effect_date': '2021-08-13',
                    'before_dept_id': 'BZL/公共资源/技术/测试中心/测试三组',
                    'before_position': '顶奢',
                    'id': '4d150c88986a8cc1lSWjHQ~~'
                },
                {
                    'effect_date': '2021-07-29',
                    'before_dept_id': 'BZL/公共资源/技术/测试中心/测试三组',
                    'before_position': '是否',
                    'id': '61673174287e7e7flSujFg~~'
                },
                {
                    'effect_date': '2021-07-21',
                    'before_dept_id': 'BZL/公共资源/技术/测试中心/测试三组',
                    'before_position': '是否',
                    'id': '792d9a50daddaf11lSujGA~~'
                },
                {
                    'effect_date': '2021-06-17',
                    'before_dept_id': 'BZL/公共资源/技术/测试中心/测试三组',
                    'before_position': '是否',
                    'id': '3033fbf81fbead8elSqiGw~~'
                },
                {
                    'effect_date': '2021-05-21',
                    'before_dept_id': 'BZL/店长直聘线/商业/北京商业一组',
                    'before_position': '是否',
                    'id': '09f2631d64b6868cliqqHA~~'
                },
                {
                    'effect_date': '2021-04-06',
                    'before_dept_id': 'BZL/公共资源/技术/测试中心/测试三组',
                    'before_position': 'iOS开发工程师',
                    'id': '9614e2072cc363f5limrFg~~'
                },
                {
                    'effect_date': '2021-03-13',
                    'before_dept_id': 'BZL/BOSS直聘线/技术/研发六组',
                    'before_position': 'iOS开发工程师',
                    'id': 'bbaf0a4a7e26cbdali-uHQ~~'
                },
                {
                    'effect_date': '2021-02-18',
                    'before_dept_id': 'BZL/BOSS直聘线/技术/研发六组',
                    'before_position': 'iOS开发工程师',
                    'id': 'd503aa1aff056dbbliyqHw~~'
                },
                {
                    'effect_date': '2021-02-02',
                    'before_dept_id': null,
                    'before_position': null,
                    'id': '008e4067c49d898clySsFw~~'
                },
                {
                    'effect_date': '2018-06-01',
                    'before_dept_id': null,
                    'before_position': null,
                    'id': '6ae7aa6710bf2119kSujHw~~'
                },
                {
                    'effect_date': '2016-12-01',
                    'before_dept_id': null,
                    'before_position': null,
                    'id': '6a215a95ca9c4d70kSusFg~~'
                }
            ],
            'multi': true
        }
    ]
};

export const interviewData = {
    'success': true,
    'host': null,
    '_csrf': null,
    'root': {
        self: [{
            userName: '拉拉',
            userId: '2312'
        }],
        cooperation: [
            {
                userName: '协作一',
                userId: '23121'
            },
            {
                userName: '协作二',
                userId: '231212'
            },
            {
                userName: '协作三',
                userId: '23121x'
            }
        ]
    }
};
const interviewData1 = {
    "success": true,
    "host": null,
    "_csrf": null,
    "root": [
        {
            "code": "junior",
            "data": [
                {
                    "id": "d82b8941d287275ckSyqH_fY",
                    "name": "贾绍生01",
                    "email": "jiashaosheng@kanzhun.com",
                    "deptLevel1Name": null,
                    "deptLevel2Name": null,
                    "deptLevel3Name": null
                },
                {
                    "id": "d82b8941d287275ckSyqH_fY1",
                    "name": "贾绍生02",
                    "email": "jiashaosheng@kanzhun.com",
                    "deptLevel1Name": null,
                    "deptLevel2Name": null,
                    "deptLevel3Name": null
                }
            ]
        },
        {
            "code": "collaboration",
            "data": [
                {
                    "id": "a03f01989aa71856kSyrHfzY",
                    "name": "王明静01",
                    "email": "wangmingjing@kanzhun.com",
                    "deptLevel1Name": null,
                    "deptLevel2Name": null,
                    "deptLevel3Name": null
                },
                {
                    "id": "a03f01989aa71856kSyrHfzY1",
                    "name": "王明静02",
                    "email": "wangmingjing@kanzhun.com",
                    "deptLevel1Name": null,
                    "deptLevel2Name": null,
                    "deptLevel3Name": null
                }
            ]
        },
        {
            "code": "oneself",          // 本人
            "data": {
                "id": "838124030b511cc7kSyrGvjU",
                "name": "苑朝阳",
                "email": "yuanchaoyang@kanzhun.com",
                "deptLevel1Name": null,
                "deptLevel2Name": null,
                "deptLevel3Name": null,
                "important": true
            }
        },
        {
            "code": "superior",
            "data": [
                {
                    "id": "a03f01989aa71856kSyrHfzY2",
                    "name": "王静01",
                    "email": "wangmingjing@kanzhun.com",
                    "deptLevel1Name": null,
                    "deptLevel2Name": null,
                    "deptLevel3Name": null
                },
                {
                    "id": "a03f01989aa71856kSyrHfzY23",
                    "name": "王静02",
                    "email": "wangmingjing@kanzhun.com",
                    "deptLevel1Name": null,
                    "deptLevel2Name": null,
                    "deptLevel3Name": null
                }
            ]
        }
    ]
}

export const interviewDataPromise = Promise.resolve(interviewData1);
// {
//     'success': true,
//     'host': null,
//     'root': {
//         self: [{
//             name: '拉拉',
//             id: '2312'
//         }],
//         cooperation: [
//             {
//                 name: '协作一',
//                 id: '23121'
//             },
//             {
//                 name: '协作二',
//                 id: '231212'
//             },
//             {
//                 name: '协作三',
//                 id: '23121x'
//             }
//         ]
//     }
// };

const interviewerRealationData = {
    "success": true,
    "host": null,
    "_csrf": null,
    "root": [
        {
            "code": "multi", 
            "tableName": "user_info_contract",
            "fieldCodeValueMap": [
                {
                    "start_date": "2016-04-18", //控件取值 multi-user_info_contract-start_date
                    "end_date": "2020-04-17",
                    "id": "2777dace81c682e6kiutHQ~~"
                }
            ],
            "multi": true //是否多子集，多子集的话，根据fieldCodeValueMap遍历填充表格
        },
        {
            "code": "multi",
            "tableName": "user_info_edu_exp",
            "fieldCodeValueMap": [
                {
                    "start_date": null,
                    "school_name": "枣庄学院",
                    "is_985": "否",
                    "id": "6909323412a0b373ly6qGg~~"
                },
                {
                    "start_date": null,
                    "school_name": "怪兽大学",
                    "is_985": null,
                    "id": "3fab3823dd3424a1liSrGw~~"
                }
            ],
            "multi": true
        },
        {
            "code": "single",
            "tableName": "user_info_job",
            "fieldCodeValueMap": [
                {
                    "dept_id": "BZL/店长直聘线/商业/北京商业一组",
                    "position": "是否",
                    "seq": "O序列",
                    "id": "2093da0e6d0a33d0lSupHA~~"
                }
            ],
            "multi": false
        },
        {
            "code": "single",
            "tableName": "user_info",
            "fieldCodeValueMap": [
                {
                    "name": "刘亚平",
                    "join_date": "2020-12-01",
                    "id": "8c54dc11309031e4ly6uGvs~"
                }
            ],
            "multi": false
        },
        {
            "code": "approve",
            "tableName": "user_info_leave_job",
            "fieldCodeValueMap": [],
            "multi": false
        },
        {
            "code": "interview",
            "tableName": "interview_info",
            "fieldCodeValueMap": [
                {
                    "interviewer_id": "王晓臣"
                }
            ],
            "multi": false
        },
        {
            "code": "multi",
            "tableName": "user_info_change",
            "fieldCodeValueMap": [
                {
                    "effect_date": "2021-08-13",
                    "before_dept_id": "BZL/公共资源/技术/测试中心/测试三组",
                    "before_position": "顶奢",
                    "id": "b6d46100ddda7019lSWtGQ~~"
                },
                {
                    "effect_date": "2021-08-13",
                    "before_dept_id": "BZL/公共资源/技术/测试中心/测试三组",
                    "before_position": "顶奢",
                    "id": "4d150c88986a8cc1lSWjHQ~~"
                },
                {
                    "effect_date": "2021-07-29",
                    "before_dept_id": "BZL/公共资源/技术/测试中心/测试三组",
                    "before_position": "是否",
                    "id": "61673174287e7e7flSujFg~~"
                },
                {
                    "effect_date": "2021-07-21",
                    "before_dept_id": "BZL/公共资源/技术/测试中心/测试三组",
                    "before_position": "是否",
                    "id": "792d9a50daddaf11lSujGA~~"
                },
                {
                    "effect_date": "2021-06-17",
                    "before_dept_id": "BZL/公共资源/技术/测试中心/测试三组",
                    "before_position": "是否",
                    "id": "3033fbf81fbead8elSqiGw~~"
                },
                {
                    "effect_date": "2021-05-21",
                    "before_dept_id": "BZL/店长直聘线/商业/北京商业一组",
                    "before_position": "是否",
                    "id": "09f2631d64b6868cliqqHA~~"
                },
                {
                    "effect_date": "2021-04-06",
                    "before_dept_id": "BZL/公共资源/技术/测试中心/测试三组",
                    "before_position": "iOS开发工程师",
                    "id": "9614e2072cc363f5limrFg~~"
                },
                {
                    "effect_date": "2021-03-13",
                    "before_dept_id": "BZL/BOSS直聘线/技术/研发六组",
                    "before_position": "iOS开发工程师",
                    "id": "bbaf0a4a7e26cbdali-uHQ~~"
                },
                {
                    "effect_date": "2021-02-18",
                    "before_dept_id": "BZL/BOSS直聘线/技术/研发六组",
                    "before_position": "iOS开发工程师",
                    "id": "d503aa1aff056dbbliyqHw~~"
                },
                {
                    "effect_date": "2021-02-02",
                    "before_dept_id": null,
                    "before_position": null,
                    "id": "008e4067c49d898clySsFw~~"
                },
                {
                    "effect_date": "2018-06-01",
                    "before_dept_id": null,
                    "before_position": null,
                    "id": "6ae7aa6710bf2119kSujHw~~"
                },
                {
                    "effect_date": "2016-12-01",
                    "before_dept_id": null,
                    "before_position": null,
                    "id": "6a215a95ca9c4d70kSusFg~~"
                }
            ],
            "multi": true
        }
    ]
}
export const interviewerRealationDataPromise = Promise.resolve(interviewerRealationData);