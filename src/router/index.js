import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index2'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/screenDisplay',
    children: [
      // {
      //   path: 'dashboard',
      //   name: 'Dashboard',
      //   component: () => import('@/views/dashboard/admin/index'),
      //   //component: () => import('@/views/screenDisplay/index'),
      //   meta: {
      //     title: '系统总览',
      //     icon: 'dashboard'
      //   }
      // },
      {
          path: 'screenDisplay',
          name: 'screenDisplay',
          component: () => import('@/views/screenDisplay/index'),
          meta: {
            title: '主页',
            icon: 'dashboard'
          }
			},
    ]
  },
]

//动态路由表：权限
export const asyncRoutes = [
  //地图
  {
    path: '/map',
    component: Layout,
    meta: {
      title: '地图',
      icon: 'map'
    },
    children: [
			{
        path: 'online_map',
        name: 'onlineMap',
        component: () => import('@/views/map/online_map/onlineMap'), // 在线地图
        meta: {
          title: '在线地图',
          icon: 'map'
        }
      },
			{
        path: 'placename-management',
        name: 'placenameMap',
        component: () => import('@/views/map/placename-management/placenameMap'), // 地名地图
        meta: {
          title: '地名地图',
          icon: 'map'
        }
      },
      {
        path: 'boundary-management',
        name: 'boundaryMap',
        component: () => import('@/views/map/boundary-management/boundaryMap'), // 界线地图
        meta: {
          title: '界线地图',
          icon: 'map'
        }
      },
      {
        path: 'boundary-stake-management',
        name: 'boundaryStakeMap',
        component: () => import('@/views/map/boundary-stake-management/boundaryStakeMap'), // 界桩地图
        meta: {
          title: '界桩地图',
          icon: 'map'
        }
      },
      {
        path: 'boundary-sign',
        name: 'boundarySignMap',
        component: () => import('@/views/map/boundary-sign/boundarySignMap'), // 边界标志物地图
        meta: {
          title: '边界标志物地图',
          icon: 'map'
        }
      },
    ]
  },

  {
    path: '/city',
    component: Layout,
    meta: {
      title: '行政区划',
      icon: 'city'
    },
    children: [
			{
        path: 'city-management',
        name: 'cityManagement',
        component: () => import('@/views/city/city-management/cityManagement'), // 在线地图
        meta: {
          title: '行政区划代码表管理',
          icon: 'city'
        }
      },
			{
        path: 'city-management',
        name: 'cityManagement',
        component: () => import('@/views/city/city-management/cityManagement'), // 地名地图
        meta: {
          title: '行政区划代码统计',
          icon: 'city'
        }
      },
    ]
  },

	{
		path: '/standardPlaceName',
		component: Layout,
		meta:{
			title: '标准地名',
			icon: 'splacename',
		},
		children: [
			{
				path: 'placeName-management',
				name: 'placeNameManagement',
				component: () => import('@/views/standardPlaceName/placeName-management/placeNameManagement'),
        meta: {
          title: '地名管理',
          icon: 'splacename'
        }
			},
			// {
			// 	path: '000',
			// 	name: '000',
			// 	component: () => import('@/views/standardPlaceName/000/000'),
      //   meta: {
      //     title: '地名导航',
      //     icon: 'splacename'
      //   }
			// },
			{
				path: '000',
				name: '000',
				component: () => import('@/views/standardPlaceName/000/000'),
        meta: {
          title: '地名版本管理',
          icon: 'splacename'
        }
			},
			{
				path: '000',
				name: '000',
				component: () => import('@/views/standardPlaceName/000/000'),
        meta: {
          title: '地名数据同步',
          icon: 'splacename'
        }
			},
			{
				path: '000',
				name: '000',
				component: () => import('@/views/standardPlaceName/000/000'),
        meta: {
          title: '地名数据上报',
          icon: 'splacename'
        }
			},
			{
				path: '000',
				name: '000',
				component: () => import('@/views/standardPlaceName/000/000'),
        meta: {
          title: '地名注记与符号配置',
          icon: 'splacename'
        }
			},
			{
				path: '000',
				name: '000',
				component: () => import('@/views/standardPlaceName/000/000'),
        meta: {
          title: '地名统计',
          icon: 'splacename'
        }
			}
		]
	},

	{
		path: '/placeSign',
		component: Layout,
		meta:{
			title: '地名标志',
			icon: 'placeSign',
		},
		children: [
			{
				path: 'placeSign-management',
				name: 'placeSignManagement',
				component: () => import('@/views/placeSign/placeSign-management/placeSignManagement'),
        meta: {
          title: '地名标志管理',
          icon: 'placeSign'
        }
			},
			{
				path: 'placeSign-management',
				name: 'placeSignManagement',
				component: () => import('@/views/placeSign/placeSign-management/placeSignManagement'),
        meta: {
          title: '地名标志版本管理',
          icon: 'placeSign'
        }
			},
			{
				path: 'placeSign-management',
				name: 'placeSignManagement',
				component: () => import('@/views/placeSign/placeSign-management/placeSignManagement'),
        meta: {
          title: '地名标志数据同步',
          icon: 'placeSign'
        }
			},
			{
				path: 'placeSign-management',
				name: 'placeSignManagement',
				component: () => import('@/views/placeSign/placeSign-management/placeSignManagement'),
        meta: {
          title: '地名标志数据上报',
          icon: 'placeSign'
        }
			},
			{
				path: 'placeSign-management',
				name: 'placeSignManagement',
				component: () => import('@/views/placeSign/placeSign-management/placeSignManagement'),
        meta: {
          title: '地名标志符号化管理',
          icon: 'placeSign'
        }
			},
			{
				path: 'placeSign-management',
				name: 'placeSignManagement',
				component: () => import('@/views/placeSign/placeSign-management/placeSignManagement'),
        meta: {
          title: '地名标志统计',
          icon: 'placeSign'
        }
			}
		]
	},

	{
		path: '/boundary',
		component: Layout,
		meta:{
			title: '边界线',
			icon: 'boundary',
		},
		children: [
			{
				path: 'boundary-management',
				name: 'boundaryManagement',
				component: () => import('@/views/boundary/boundary-management/boundaryManagement'),
        meta: {
          title: '行政界线管理',
          icon: 'boundary'
        }
			},
			{
				path: 'boundary-management',
				name: 'boundaryManagement',
				component: () => import('@/views/boundary/boundary-management/boundaryManagement'),
        meta: {
          title: '村级管理线管理',
          icon: 'boundary'
        }
			},
			{
				path: 'boundary-management',
				name: 'boundaryManagement',
				component: () => import('@/views/boundary/boundary-management/boundaryManagement'),
        meta: {
          title: '界线版本管理',
          icon: 'boundary'
        }
			},
			{
				path: 'boundary-management',
				name: 'boundaryManagement',
				component: () => import('@/views/boundary/boundary-management/boundaryManagement'),
        meta: {
          title: '界线符号配置管理',
          icon: 'boundary'
        }
			},
			{
				path: 'boundary-management',
				name: 'boundaryManagement',
				component: () => import('@/views/boundary/boundary-management/boundaryManagement'),
        meta: {
          title: '边界线统计',
          icon: 'boundary'
        }
			}
		]
	},

	{
		path: '/boundarySign',
		component: Layout,
		meta:{
			title: '界线标志物',
			icon: 'boundarySign',
		},
		children: [
			{
				path: 'boundarySign-management',
				name: 'boundarySignManagement',
				component: () => import('@/views/boundarySign/boundarySign-management/boundarySignManagement'),
        meta: {
          title: '界线标志物管理',
          icon: 'boundarySign'
        }
			},
			// {
			// 	path: 'boundarySign-management',
			// 	name: 'boundarySignManagement',
			// 	component: () => import('@/views/boundarySign/boundarySign-management/boundarySignManagement'),
      //   meta: {
      //     title: '界线标志物导航',
      //     icon: 'boundarySign'
      //   }
			// },
			{
				path: 'boundarySign-management',
				name: 'boundarySignManagement',
				component: () => import('@/views/boundarySign/boundarySign-management/boundarySignManagement'),
        meta: {
          title: '界线标志物版本管理',
          icon: 'boundarySign'
        }
			},
			{
				path: 'boundarySign-management',
				name: 'boundarySignManagement',
				component: () => import('@/views/boundarySign/boundarySign-management/boundarySignManagement'),
        meta: {
          title: '界桩符号配置管理',
          icon: 'boundarySign'
        }
			},
			{
				path: 'boundarySign-management',
				name: 'boundarySignManagement',
				component: () => import('@/views/boundarySign/boundarySign-management/boundarySignManagement'),
        meta: {
          title: '告警参数配置',
          icon: 'boundarySign'
        }
			},
			{
				path: 'boundarySign-management',
				name: 'boundarySignManagement',
				component: () => import('@/views/boundarySign/boundarySign-management/boundarySignManagement'),
        meta: {
          title: '界线标志物统计',
          icon: 'boundarySign'
        }
			}
		]
	},

  {
    path: '/service',
    component: Layout,
    meta: {
      title: '服务',
      icon: 'safety'
    },
    children: [
			{
        path: 'service-management',
        name: 'serviceManagement',
        component: () => import('@/views/service/service-management/serviceManagement'), // 在线地图
        meta: {
          title: '服务平台配置',
          icon: 'safety'
        }
      },
    ]
  },

	{
    path: '/system',
    component: Layout,
    redirect: '/system/assgin-permissions',
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'systemManager',
			roles: ['Administrator', '社区', '网格员']//设置元信息roles：权限
    },
    children: [
			{
				path: 'update-psd',
				name: 'update-psd',
				component: () => import('@/views/system/update-psd'),
				meta: {
					title: '字典管理',
					icon: 'password',//没有roles，则不需权限，即所有用户均可访问
				}
			},
			{
				path: 'update-psd',
				name: 'update-psd',
				component: () => import('@/views/system/update-psd'),
				meta: {
					title: '角色管理',
					icon: 'password',//没有roles，则不需权限，即所有用户均可访问
				}
			},
      {
        path: 'assgin-permissions',
        name: 'assgin-permissions',
        component: () => import('@/views/system/assgin-permissions'),
        meta: {
          title: '权限管理',
          icon: 'permission',
        }
      },
      {
        path: 'create-user',
        name: 'create-user',
        component: () => import('@/views/system/create-user'),
        meta: {
          title: '用户管理',
          icon: 'user',
        }
      },
      // {
      //   path: 'reset-psd',
      //   name: 'reset-psd',
      //   component: () => import('@/views/system/reset-psd'),
      //   meta: {
      //     title: '密码重置',
      //     icon: 'password',
			// 		roles: ['Administrator']
      //   }
      // },
			{
        path: 'create-user',
        name: 'create-user',
        component: () => import('@/views/system/create-user'),
        meta: {
          title: '日志管理',
          icon: 'user',
        }
      },
			{
        path: 'create-user',
        name: 'create-user',
        component: () => import('@/views/system/create-user'),
        meta: {
          title: '组织机构管理',
          icon: 'user',
        }
      }
    ]
  },
	// 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
