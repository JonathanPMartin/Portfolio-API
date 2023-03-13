// check that the npm environment has set the test DB correctly
test('Jest should use the test DB', ()=> {
  expect(process.env.DB_DATABASE).toBe('test_db');
})
// This passes because 1 === 1
test('Testing to see if Jest works 2', () => {
    expect(1).toBe(1)
  })