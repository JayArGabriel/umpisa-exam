import { shallowMount } from '@vue/test-utils'
import Modal from '@/components/Modal.vue'

describe('Modal.vue', () => {
  // Now mount the component and you have the wrapper
  const wrapper = shallowMount(Modal)
  
  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<label class="col-sm-4 col-form-label">Plate Number:</label>')
  })

  // it's also easy to check for the existence of elements
  it('has a error class', () => {
    expect(wrapper.find('.error').exists()).toBe(false)
  })
})