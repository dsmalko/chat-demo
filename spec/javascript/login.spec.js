import { shallow, createLocalVue } from '@vue/test-utils';
import Login from 'vue/components/login'

const localVue = createLocalVue();

describe('Login.vue', () => {
  let auth = auth = {
    login: jest.fn().mockImplementation(() => {
      return Promise.resolve()
    })
  }

  describe('Log in', () => {
    describe('with valid credentials', () => {
      it('calls $auth.login()', () => {
        const wrapper = shallow(Login, {
          localVue,
          mocks: {
            '$auth': auth
          },
          stubs: ['router-link']
        })

        const emailInput = wrapper.find('#user_email')
        const passwordInput = wrapper.find('#user_password')
        const submitBtn = wrapper.find('button')

        emailInput.element.value = 'example@example.com'
        passwordInput.element.value = '123456'
        submitBtn.trigger('click')
        expect(auth.login).toHaveBeenCalled();
      })
    })
  })
})