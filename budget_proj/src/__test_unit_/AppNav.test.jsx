import {describe, it, expect} from 'vitest'
import TestRenderer from 'react-test-renderer'
import AppNav from '../components/AppNav'
import { MemoryRouter } from 'react-router-dom'


describe("AppNav", () => {
  it("test the links", () => {
    const navbar = TestRenderer.create(<MemoryRouter><AppNav /></MemoryRouter>).toJSON()
    console.log(navbar)
  })

})