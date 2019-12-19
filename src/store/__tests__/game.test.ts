import {Reducer, addResult} from '../game'

describe('Game store', () => {
	describe('Reducer', () => {
		it('should return the initial state', () => {
			expect(Reducer(undefined, {type: 'default'})).toEqual({
				history: [],
			})
		})

		test('ADD_RESULT', () => {
			const result = Reducer(undefined, addResult({
				user: 'user1',
				level: 1,
				item: 'test1',
				pass: false,
			}))

			expect(result.history[0].history.length).toEqual(1)
			expect(result.history[0].history[0].pass).toEqual(false)
			expect(result.history[0].level).toEqual(1)
			expect(result.history[0].progress).toEqual(0)
		})
	})
})
