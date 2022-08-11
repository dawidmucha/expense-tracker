import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import RegisterForm from '@/components/RegisterForm'

describe('App.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.html()).toMatch('Home')
  })
})

describe('Firebase', () => {
  it('should sign up a user with correct credentials', async () => {
    const wrapper = shallowMount(RegisterForm)

    const email = wrapper.find('input[type=email]')
    await email.setValue('test@gmail.com')

    const password = wrapper.find('input[type=password]')
    await password.setValue('zaq1@WSX')

    const submit = wrapper.find('input[type=submit]')
    await submit.trigger('click')

    setTimeout(() => {
      expect(wrapper.emitted()).toHaveProperty('registered')
    }, 100)
  })

  it('shouldnt sign up a user with wrong credentials', async () => {
    const wrapper = shallowMount(RegisterForm)

    const email = wrapper.find('input[type=email]')
    await email.setValue('not an email')

    const password = wrapper.find('input[type=password]')
    await password.setValue('zaq1@WSX')

    const submit = wrapper.find('input[type=submit]')
    await submit.trigger('click')

    setTimeout(() => {
      expect(wrapper.emitted()).toHaveProperty(undefined)
    }, 100)
  })
})