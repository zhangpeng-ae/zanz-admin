import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { asyncRoutes, constantRouter } from '@/router/index'

export interface IAsyncRouteState {
  menus: RouteRecordRaw[]
  routers: any[]
  routersAdded: any[]
  isDynamicRouteAdded: boolean
}

function filter<T>(tree: T[], userPer: any) {
  function listFilter(tree: T[]) {
    return tree.map((route: any) => {
      if (!route.meta.permissions) {
        return route
      }
      if (route.children) {
        return {
          ...route,
          children: listFilter(route.children),
        }
      }

      return route
    })
  }

  return listFilter(tree)
}

export const useAsyncRouteStore = defineStore('appAsyncRoute', {
  state: (): IAsyncRouteState => ({
    menus: [],
    routers: constantRouter,
    routersAdded: [],
    isDynamicRouteAdded: false,
  }),
  getters: {
    getMenus(): RouteRecordRaw[] {
      return this.menus
    },
    getIsDynamicRouteAdded(): boolean {
      return this.isDynamicRouteAdded
    },
  },
  actions: {
    // 设置动态路由
    setRouters(routers: RouteRecordRaw[]) {
      this.routersAdded = routers
      this.routers = constantRouter.concat(routers)
    },
    setMenus(menus: RouteRecordRaw[]) {
      // 设置动态路由
      this.menus = menus
    },
    setDynamicRouteAdded(added: boolean) {
      this.isDynamicRouteAdded = added
    },
    generateRoutes(data) {
      let accessedRouters
      const permissionsList = data.permissions ?? []
      try {
        accessedRouters = filter<RouteRecordRaw>(asyncRoutes, permissionsList)
      } catch (error) {
        console.log(error)
      }
      this.setRouters(accessedRouters)
      this.setMenus(accessedRouters)

      return accessedRouters
    },
  },
})
