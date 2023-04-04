import {describe, it, expect} from 'vitest'
import TestRenderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'

describe("HomePage", () => {
  it("check form", () => {
    const homepage = TestRenderer.create(<MemoryRouter><HomePage /></MemoryRouter>).toJSON()
    console.log(homepage[4].children[0].props)
    const form = homepage[4];
    expect(form.children.length).toBe(5)
    expect(form.children[0].props.type).toBe('text')
  })

  it("create a snapshot", () => {
    const homepage = TestRenderer.create(<MemoryRouter><HomePage /></MemoryRouter>).toJSON()
    expect(homepage).toMatchSnapshot();
  })
})