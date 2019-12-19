import {Reducer, addResult, getQuestionForLevel} from '../game'

jest.mock('react-redux', () => ({
	useDispatch: () => {},
	useSelector: () => {
		return [{
			level: 1,
			history: [],
		}, {
			level: 2,
			history: [],
		}]
	}
}));

describe('Game store', () => {
	describe('Views', () => {
		it('handle no history', () => {
			const level = {
				id: -1,
				items: []
			}

			const results = getQuestionForLevel(level)
			expect(results).toEqual(false)
		})

		it('get correct question list', () => {
			const level = {
				id: 1,
				items: [{
					id: 1,
					name: 'a',
				}, {
					id: 2,
					name: 'b',
				}, {
					id: 3,
					name: 'c',
				}]
			}

			const results = getQuestionForLevel(level)
			// console.log('results', results)

			expect(results.question.id).toEqual(1)
			expect(results.options.length).toEqual(3)
		})

	})

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
				attempts: [],
			}))

			expect(result.history[0].history.length).toEqual(1)
			expect(result.history[0].history[0].attempts).toEqual([])
			expect(result.history[0].level).toEqual(1)
			expect(result.history[0].progress).toEqual(0)
		})
	})
})
