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
      //     title: '????????????',
      //     icon: 'dashboard'
      //   }
      // },
      {
          path: 'screenDisplay',
          name: 'screenDisplay',
          component: () => import('@/views/screenDisplay/index'),
          meta: {
            title: '??????',
            icon: 'dashboard'
          }
			},
    ]
  },
]

//????????????????????????
export const asyncRoutes = [
  //??????
  {
    path: '/map',
    component: Layout,
    meta: {
      title: '??????',
      icon: 'map'
    },
    children: [
			{
        path: 'online_map',
        name: 'onlineMap',
        component: () => import('@/views/map/online_map/onlineMap'), // ????????????
        meta: {
          title: '????????????',
          icon: 'map'
        }
      },
			{
        path: 'placename-management',
        name: 'placenameMap',
        component: () => import('@/views/map/placename-management/placenameMap'), // ????????????
        meta: {
          title: '????????????',
          icon: 'map'
        }
      },
      {
        path: 'boundary-management',
        name: 'boundaryMap',
        component: () => import('@/views/map/boundary-management/boundaryMap'), // ????????????
        meta: {
          title: '????????????',
          icon: 'map'
        }
      },
      {
        path: 'boundary-stake-management',
        name: 'boundaryStakeMap',
        component: () => import('@/views/map/boundary-stake-management/boundaryStakeMap'), // ????????????
        meta: {
          title: '????????????',
          icon: 'map'
        }
      },
      {
        path: 'boundary-sign',
        name: 'boundarySignMap',
        component: () => import('@/views/map/boundary-sign/boundarySignMap'), // ?????????????????????
        meta: {
          title: '?????????????????????',
          icon: 'map'
        }
      },
    ]
  },

  {
    path: '/city',
    component: Layout,
    meta: {
      title: '????????????',
      icon: 'city'
    },
    children: [
			{
        path: 'city-management',
        name: 'cityManagement',
        component: () => import('@/views/city/city-management/cityManagement'), // ????????????
        meta: {
          title: '???????????????????????????',
          icon: 'city'
        }
      },
			{
        path: 'city-management',
        name: 'cityManagement',
        component: () => import('@/views/city/city-management/cityManagement'), // ????????????
        meta: {
          title: '????????????????????????',
          icon: 'city'
        }
      },
    ]
  },

	{
		path: '/standardPlaceName',
		component: Layout,
		meta:{
			title: '????????????',
			icon: 'splacename',
		},
		children: [
			{
				path: 'placeName-management',
				name: 'placeNameManagement',
				component: () => import('@/views/standardPlaceName/placeName-management/placeNameManagement'),
        meta: {
          title: '????????????',
          icon: 'splacename'
        }
			},
			// {
			// 	path: '000',
			// 	name: '000',
			// 	component: () => import('@/views/standardPlaceName/000/000'),
      //   meta: {
      //     title: '????????????',
      //     icon: 'splacename'
      //   }
			// },
			{
				path: '000',
				name: '000',
				component: () => import('@/views/standardPlaceName/000/000'),
        meta: {
          title: '??????????????????',
          icon: 'splacename'
        }
			},
			{
				path: '000',
				name: '000',
				component: () => import('@/views/standardPlaceName/000/000'),
        meta: {
          title: '??????????????????',
          icon: 'splacename'
        }
			},
			{
				path: '000',
				name: '000',
				component: () => import('@/views/standardPlaceName/000/000'),
        meta: {
          title: '??????????????????',
          icon: 'splacename'
        }
			},
			{
				path: '000',
				name: '000',
				component: () => import('@/views/standardPlaceName/000/000'),
        meta: {
          title: '???????????????????????????',
          icon: 'splacename'
        }
			},
			{
				path: '000',
				name: '000',
				component: () => import('@/views/standardPlaceName/000/000'),
        meta: {
          title: '????????????',
          icon: 'splacename'
        }
			}
		]
	},

	{
		path: '/placeSign',
		component: Layout,
		meta:{
			title: '????????????',
			icon: 'placeSign',
		},
		children: [
			{
				path: 'placeSign-management',
				name: 'placeSignManagement',
				component: () => import('@/views/placeSign/placeSign-management/placeSignManagement'),
        meta: {
          title: '??????????????????',
          icon: 'placeSign'
        }
			},
			{
				path: 'placeSign-management',
				name: 'placeSignManagement',
				component: () => import('@/views/placeSign/placeSign-management/placeSignManagement'),
        meta: {
          title: '????????????????????????',
          icon: 'placeSign'
        }
			},
			{
				path: 'placeSign-management',
				name: 'placeSignManagement',
				component: () => import('@/views/placeSign/placeSign-management/placeSignManagement'),
        meta: {
          title: '????????????????????????',
          icon: 'placeSign'
        }
			},
			{
				path: 'placeSign-management',
				name: 'placeSignManagement',
				component: () => import('@/views/placeSign/placeSign-management/placeSignManagement'),
        meta: {
          title: '????????????????????????',
          icon: 'placeSign'
        }
			},
			{
				path: 'placeSign-management',
				name: 'placeSignManagement',
				component: () => import('@/views/placeSign/placeSign-management/placeSignManagement'),
        meta: {
          title: '???????????????????????????',
          icon: 'placeSign'
        }
			},
			{
				path: 'placeSign-management',
				name: 'placeSignManagement',
				component: () => import('@/views/placeSign/placeSign-management/placeSignManagement'),
        meta: {
          title: '??????????????????',
          icon: 'placeSign'
        }
			}
		]
	},

	{
		path: '/boundary',
		component: Layout,
		meta:{
			title: '?????????',
			icon: 'boundary',
		},
		children: [
			{
				path: 'boundary-management',
				name: 'boundaryManagement',
				component: () => import('@/views/boundary/boundary-management/boundaryManagement'),
        meta: {
          title: '??????????????????',
          icon: 'boundary'
        }
			},
			{
				path: 'boundary-management',
				name: 'boundaryManagement',
				component: () => import('@/views/boundary/boundary-management/boundaryManagement'),
        meta: {
          title: '?????????????????????',
          icon: 'boundary'
        }
			},
			{
				path: 'boundary-management',
				name: 'boundaryManagement',
				component: () => import('@/views/boundary/boundary-management/boundaryManagement'),
        meta: {
          title: '??????????????????',
          icon: 'boundary'
        }
			},
			{
				path: 'boundary-management',
				name: 'boundaryManagement',
				component: () => import('@/views/boundary/boundary-management/boundaryManagement'),
        meta: {
          title: '????????????????????????',
          icon: 'boundary'
        }
			},
			{
				path: 'boundary-management',
				name: 'boundaryManagement',
				component: () => import('@/views/boundary/boundary-management/boundaryManagement'),
        meta: {
          title: '???????????????',
          icon: 'boundary'
        }
			}
		]
	},

	{
		path: '/boundarySign',
		component: Layout,
		meta:{
			title: '???????????????',
			icon: 'boundarySign',
		},
		children: [
			{
				path: 'boundarySign-management',
				name: 'boundarySignManagement',
				component: () => import('@/views/boundarySign/boundarySign-management/boundarySignManagement'),
        meta: {
          title: '?????????????????????',
          icon: 'boundarySign'
        }
			},
			// {
			// 	path: 'boundarySign-management',
			// 	name: 'boundarySignManagement',
			// 	component: () => import('@/views/boundarySign/boundarySign-management/boundarySignManagement'),
      //   meta: {
      //     title: '?????????????????????',
      //     icon: 'boundarySign'
      //   }
			// },
			{
				path: 'boundarySign-management',
				name: 'boundarySignManagement',
				component: () => import('@/views/boundarySign/boundarySign-management/boundarySignManagement'),
        meta: {
          title: '???????????????????????????',
          icon: 'boundarySign'
        }
			},
			{
				path: 'boundarySign-management',
				name: 'boundarySignManagement',
				component: () => import('@/views/boundarySign/boundarySign-management/boundarySignManagement'),
        meta: {
          title: '????????????????????????',
          icon: 'boundarySign'
        }
			},
			{
				path: 'boundarySign-management',
				name: 'boundarySignManagement',
				component: () => import('@/views/boundarySign/boundarySign-management/boundarySignManagement'),
        meta: {
          title: '??????????????????',
          icon: 'boundarySign'
        }
			},
			{
				path: 'boundarySign-management',
				name: 'boundarySignManagement',
				component: () => import('@/views/boundarySign/boundarySign-management/boundarySignManagement'),
        meta: {
          title: '?????????????????????',
          icon: 'boundarySign'
        }
			}
		]
	},

  {
    path: '/service',
    component: Layout,
    meta: {
      title: '??????',
      icon: 'safety'
    },
    children: [
			{
        path: 'service-management',
        name: 'serviceManagement',
        component: () => import('@/views/service/service-management/serviceManagement'), // ????????????
        meta: {
          title: '??????????????????',
          icon: 'safety'
        }
      },
    ]
  },

	{
    path: '/system',
    component: Layout,
    redirect: '/system/assgin-permissions',
    name: '????????????',
    meta: {
      title: '????????????',
      icon: 'systemManager',
			roles: ['Administrator', '??????', '?????????']//???????????????roles?????????
    },
    children: [
			{
				path: 'update-psd',
				name: 'update-psd',
				component: () => import('@/views/system/update-psd'),
				meta: {
					title: '????????????',
					icon: 'password',//??????roles????????????????????????????????????????????????
				}
			},
			{
				path: 'update-psd',
				name: 'update-psd',
				component: () => import('@/views/system/update-psd'),
				meta: {
					title: '????????????',
					icon: 'password',//??????roles????????????????????????????????????????????????
				}
			},
      {
        path: 'assgin-permissions',
        name: 'assgin-permissions',
        component: () => import('@/views/system/assgin-permissions'),
        meta: {
          title: '????????????',
          icon: 'permission',
        }
      },
      {
        path: 'create-user',
        name: 'create-user',
        component: () => import('@/views/system/create-user'),
        meta: {
          title: '????????????',
          icon: 'user',
        }
      },
      // {
      //   path: 'reset-psd',
      //   name: 'reset-psd',
      //   component: () => import('@/views/system/reset-psd'),
      //   meta: {
      //     title: '????????????',
      //     icon: 'password',
			// 		roles: ['Administrator']
      //   }
      // },
			{
        path: 'create-user',
        name: 'create-user',
        component: () => import('@/views/system/create-user'),
        meta: {
          title: '????????????',
          icon: 'user',
        }
      },
			{
        path: 'create-user',
        name: 'create-user',
        component: () => import('@/views/system/create-user'),
        meta: {
          title: '??????????????????',
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
