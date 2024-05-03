import type { App } from "vue";
import components from '@/shared/ui';

export function registerComponents(application: App) {
  components.forEach(component => {
  application.component(component.name!, component)
})
}