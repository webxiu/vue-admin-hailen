<template>
  <div>
    <div>权限</div>
    <el-cascader-panel
      ref="serveSelectRef"
      v-model="value"
      :options="options"
      :expand-all="true"
      :show-all-levels="true"
      :props="defaultProps"
      @change="change"
      @expand-change="expandChange"
    />
    <el-button @click="submit">提交</el-button>
  </div>
</template>

<script>
export default {
  name: 'TreeAccess',
  data() {
    return {
      value: ['100', '90', '82'],
      defaultProps: {
        expandTrigger: 'click',
        multiple: true,
        emitPath: true, // 不关联选中
        checkStrictly: false,
        value: 'id',
        label: 'name',
        children: 'childList'
      },
      options: []
    }
  },
  mounted() {
    // 菜单数据
    const r = {
      code: 0,
      message: 'success',
      data: [
        {
          id: '100',
          name: '趋势预测',
          childList: [
            {
              id: '100',
              name: '趋势预测',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '100',
              name: '趋势预测',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '100',
              name: '趋势预测',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '100',
              name: '趋势预测',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '100',
              name: '趋势预测',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '100',
              name: '趋势预测',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '100',
              name: '趋势预测',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '100',
              name: '趋势预测',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '100',
              name: '趋势预测',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '100',
              name: '趋势预测',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '100',
              name: '趋势预测',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '100',
              name: '趋势预测',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '100',
              name: '趋势预测',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            }
          ]
        },
        {
          id: '168',
          name: 'new'
        },
        {
          id: '101',
          name: '正在流行',
          childList: [
            {
              id: '101',
              name: '正在流行',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '101',
              name: '正在流行',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '101',
              name: '正在流行',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '101',
              name: '正在流行',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '101',
              name: '正在流行',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '101',
              name: '正在流行',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            }
          ]
        },
        {
          id: '164',
          name: '品牌分析',
          childList: [
            {
              id: '164',
              name: '品牌分析',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '164',
              name: '品牌分析',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '164',
              name: '品牌分析',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            }
          ]
        },
        {
          id: '103',
          name: '市场分析',
          childList: [
            {
              id: '103',
              name: '市场分析',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '103',
              name: '市场分析',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '103',
              name: '市场分析',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '103',
              name: '市场分析',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            }
          ]
        },
        {
          id: '102',
          name: '秀场发布',
          childList: [
            {
              id: '102',
              name: '秀场发布',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '102',
              name: '秀场发布',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '102',
              name: '秀场发布',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '102',
              name: '秀场发布',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '102',
              name: '秀场发布',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            }
          ]
        },
        {
          id: '104',
          name: '款式图库',
          childList: [
            {
              id: '104',
              name: '款式图库',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '104',
              name: '款式图库',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '104',
              name: '款式图库',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '104',
              name: '款式图库',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '104',
              name: '款式图库',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '104',
              name: '款式图库',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '104',
              name: '款式图库',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            }
          ]
        },
        {
          id: '105',
          name: '图案',
          childList: [
            {
              id: '105',
              name: '图案',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '105',
              name: '图案',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '105',
              name: '图案',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            }
          ]
        },
        {
          id: '167',
          name: '视频',
          childList: [
            {
              id: '167',
              name: '视频',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '167',
              name: '视频',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '167',
              name: '视频',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            }
          ]
        },
        {
          id: '106',
          name: '时尚穿搭',
          childList: [
            {
              id: '106',
              name: '时尚穿搭',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '106',
              name: '时尚穿搭',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '106',
              name: '时尚穿搭',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '106',
              name: '时尚穿搭',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            }
          ]
        },
        {
          id: '152',
          name: '灵感源',
          childList: [
            {
              id: '152',
              name: '灵感源',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            },
            {
              id: '152',
              name: '灵感源',
              childList: [
                {
                  id: 'VISIT',
                  name: '访问'
                },
                {
                  id: 'D_ZIP',
                  name: '下载压缩包'
                },
                {
                  id: 'D_PDF',
                  name: '下载PDF'
                },
                {
                  id: 'C_REPORT',
                  name: '收藏报告'
                },
                {
                  id: 'D_PIC',
                  name: '下载图片'
                }
              ]
            }
          ]
        }
      ],
      msId: null,
      total: null
    }
    this.options = r.data
  },
  methods: {
    /**
     * 选中
     */
    change(val) {
      console.log('选中======>', val)
      var aa = [
        ['100', '90', '81'],
        ['100', '90', '82'],
        ['100', '90', '83'],
        ['100', '90', '84'],
        ['100', '92', '71'],
        ['100', '92', '72']
      ]
    },
    /**
     * 展开
     */
    expandChange(val) {
      console.log('展开======>', val)
    },
    /**
     * 提交
     */
    submit(val) {
      const ref = this.$refs.serveSelectRef.getCheckedNodes(true) // 是否显示叶子节点
      console.log('获取选中的节点======>', this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
