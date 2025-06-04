import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './server'
import '@testing-library/jest-dom/vitest'
import 'whatwg-fetch'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
