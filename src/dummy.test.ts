test('msw', async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    console.log(data);
    expect(data).toHaveLength(100);
  });
  