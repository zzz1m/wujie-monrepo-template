<template>
<div class="block-evaluation-list">
    <div v-if="label" class="block-evaluation-list-label">
        {{ label }}
        <ui-tooltip v-if="evaluationType === 1 && ['投入度', '规则意识', '解决问题'].includes(label)" placement="right" :open-delay="400" class="evaluate-fill-help-content" popper-class="evaluate-fill-rules-popover" max-width="400">
            <div><svg-icon icon-class="meet-help" /></div>
            <div slot="content" class="evaluate-fill-wrapper">
                <ui-table v-if="label === '投入度'" stripe :border="true">
                    <thead slot="header">
                        <tr>
                            <th>指标</th>
                            <th>指标说明</th>
                        </tr>
                    </thead>
                    <tbody slot="body">
                        <tr>
                            <td>自己的投入度</td>
                            <td>对BZL事业的认同度、对团队的归属感、对工作的精力投入。</td>
                        </tr>
                        <tr>
                            <td>下属管理者的投入度<span class="small-label">（仅适用于管理者）</span></td>
                            <td>作为干部，引导下属管理者，使众人对BZL事业的认同度、对团队的归属感、对工作的精力投入。</td>
                        </tr>
                    </tbody>
                </ui-table>
                <ui-table v-else-if="label === '规则意识'" stripe :border="true">
                    <thead slot="header">
                        <tr>
                            <th>指标</th>
                            <th>指标说明</th>
                        </tr>
                    </thead>
                    <tbody slot="body">
                        <tr>
                            <td>自己的规则意识</td>
                            <td>能遵守规则，包括遵守法律、社会公德、公司制度与规则。</td>
                        </tr>
                        <tr>
                            <td>团队的规则意识<span class="small-label">（仅适用于管理者）</span></td>
                            <td>作为干部以身作则，在团队内部建立规则，提倡平等，塑造氛围。</td>
                        </tr>
                    </tbody>
                </ui-table>
                <ui-table v-else-if="label === '解决问题'" stripe :border="true">
                    <thead slot="header">
                        <tr>
                            <th>指标</th>
                            <th>指标说明</th>
                        </tr>
                    </thead>
                    <tbody slot="body">
                        <tr>
                            <td>发现问题</td>
                            <td>
                                <p>针对业务与组织成长，发现了哪些关键问题？ </p>
                                <p>业务问题：对BZL愿景、战略目标、OKR、五个能力，有价值的问题。</p>
                                <p>组织成长问题<span class="small-label">（仅适用于管理者）</span>：对员工思维、员工能力、员工治理，有价值的问题。</p>
                            </td>
                        </tr>
                        <tr>
                            <td>解决业务问题</td>
                            <td>实际解决了什么业务问题，取得的价值？</td>
                        </tr>
                        <tr>
                            <td>解决组织成长问题<span class="small-label">（仅适用于管理者）</span></td>
                            <td>作为干部，实际解决了什么组织成长问题，取得的价值？</td>
                        </tr>
                    </tbody>
                </ui-table>
            </div>
        </ui-tooltip>
    </div>
    <div v-if="description" class="block-evaluation-item-case" v-html="description"></div>
    <div class="block-evaluation-list-content">
        <slot></slot>
    </div>
    <slot name="footer"></slot>
</div>
</template>

<script>
export default {
    name: 'EvaluationList',
    props: {
        label: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        evaluationType: {
            type: Number,
            default: 1
        }
    },
    computed: {
        
    }
};
</script>