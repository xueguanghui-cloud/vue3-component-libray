<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    trigger: string
    placement: string
    teleported: boolean
  }>(),
  {
    trigger: 'click', // 触发方式: click focus hover contextmenu
    placement: 'top', // 出现的位置: top left bottom right
    teleported: true // 是否将 popover 的下拉列表插入至 body 元素
  }
)

const popoverInfo = reactive({
  left: 0,
  top: 0
})

const showPopover = ref(false)
const popover = ref<HTMLElement>()
const reference = ref<HTMLElement>()
const arrowRef = ref<HTMLDivElement>()

watch(showPopover, (newVal) => {
  newVal ? positionContent() : destroyPopper()
})

onMounted(() => {
  // 点击
  if (props.trigger === 'click') {
    reference.value?.children[0].addEventListener('click', doToggle)
  }
  // 悬浮
  else if (props.trigger === 'hover') {
    reference.value?.children[0].addEventListener('mouseenter', doToggle)
    reference.value?.children[0].addEventListener('mouseleave', doToggle)
  }
  // 焦点
  else if (props.trigger === 'focus') {
    reference.value?.children[0].addEventListener('focus', doToggle)
    reference.value?.children[0].addEventListener('blur', doToggle)
  }
  // 鼠标右键
  else if (props.trigger === 'contextmenu') {
    reference.value?.children[0].addEventListener('contextmenu', doToggle)
  }

  // 点击 popover 外部关闭 popover
  document.documentElement.addEventListener('click', (e: MouseEvent) => {
    // 如果点击的是触发元素，则return；
    if (
      e.target === reference.value?.children[0] ||
      popover.value?.contains(e.target as Node)
    )
      return
    if (e.target != popover.value?.children[0]) showPopover.value = false
  })
})

// 切换 是否显示 popover
const doToggle = (e: Event) => {
  e.preventDefault()
  showPopover.value = !showPopover.value
}

interface PositionInfo {
  [key: string]: {
    arrowClass: string
    top: number
    left: number
  }
  top: {
    arrowClass: string
    top: number
    left: number
  }
  bottom: {
    arrowClass: string
    top: number
    left: number
  }
  left: {
    arrowClass: string
    top: number
    left: number
  }
  right: {
    arrowClass: string
    top: number
    left: number
  }
}

const positionContent = () => {
  const { width, height, top, left } =
    reference.value!.children[0].getBoundingClientRect()
  const temp = popover.value!.style.display
  popover.value!.style.display = 'block'
  const popoverWidth = popover.value!.offsetWidth
  const popoverHeight = popover.value!.offsetHeight
  popover.value!.style.display = temp
  console.log(width, height, top, left, popoverWidth, popoverHeight)

  const positionInfo: PositionInfo = {
    top: {
      arrowClass: 'arrow-top',
      top: top - popoverHeight - 20,
      left:
        left + width / 2 - popoverWidth / 2 < 0
          ? 0
          : left + width / 2 - popoverWidth / 2
    },
    bottom: {
      arrowClass: 'arrow-bottom',
      top: top + height + 20,
      left:
        left + width / 2 - popoverWidth / 2 < 0
          ? 0
          : left + width / 2 - popoverWidth / 2
    },
    left: {
      arrowClass: left - popoverWidth - 20 < 0 ? 'arrow-right' : 'arrow-left',
      top: top + height / 2 - popoverHeight / 2,
      left:
        left - popoverWidth - 20 < 0
          ? left + width + 20
          : left - popoverWidth - 20
    },
    right: {
      arrowClass: left + width + 20 < 0 ? 'arrow-left' : 'arrow-right',
      top: top + height / 2 - popoverHeight / 2,
      left: left + width + 20 < 0 ? left - popoverWidth - 20 : left + width + 20
    }
  }
  popoverInfo.left = positionInfo[props.placement].left
  popoverInfo.top = positionInfo[props.placement].top
  arrowRef.value!.setAttribute(
    'class',
    `popover-arrow ${positionInfo[props.placement].arrowClass}`
  )
}

const destroyPopper = () => {}
</script>

<template>
  <div class="gh-popover">
    <div ref="reference" class="reference">
      <slot name="reference">主体内容</slot>
    </div>
    <Teleport to="body">
      <Transition>
        <div
          class="popover-content"
          v-show="showPopover"
          ref="popover"
          :style="{
            left: `${popoverInfo.left}px`,
            top: `${popoverInfo.top}px`
          }"
        >
          <slot name="popover">弹窗内容</slot>
          <div class="popover-arrow" ref="arrowRef"></div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.gh-popover {
  position: relative;
}
.popover-content {
  position: absolute;
  top: 35px;
  min-width: 200px;
  min-height: 100px;
  color: #000;
  padding: 10px;
  border: 1px solid red;
  background-color: #fff;
}
.popover {
  position: absolute;
  left: 50%;
}

.popover-arrow {
  width: 10px;
  height: 10px;
  position: absolute;
  transform: translateX(-5px);
}
.popover-arrow::before {
  position: absolute;
  width: 10px;
  height: 10px;
  content: '';
  transform: rotate(45deg);
  box-sizing: border-box;
  border: 1px solid red;
  background-color: #fff;
}

.arrow-top {
  left: calc(50% - 5px);
  bottom: -5px;
}
.arrow-top::before {
  border-top-color: transparent !important;
  border-left-color: transparent !important;
}

.arrow-right {
  left: 0px;
  top: calc(50% - 5px);
}
.arrow-right::before {
  border-top-color: transparent !important;
  border-right-color: transparent !important;
}

.arrow-bottom {
  left: calc(50% - 5px);
  top: -5px;
}
.arrow-bottom::before {
  border-bottom-color: transparent !important;
  border-right-color: transparent !important;
}

.arrow-left {
  right: -10px;
  top: calc(50% - 5px);
}
.arrow-left::before {
  border-bottom-color: transparent !important;
  border-left-color: transparent !important;
}
</style>
