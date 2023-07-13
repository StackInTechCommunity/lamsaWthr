## SETUP 

1. Install PNPM:

```bash
  npm install -g pnpm
```

2. Install dependencies:

```bash
  pnpm i
```
    
For Install dependencies only for server use : 

```bash
  pnpm recursive install <package> --filter server
```

For Install dependencies only for web use : 

```bash
  pnpm recursive install <package> --filter web
```


3. Run scripts or commands:

```bash
  pnpm run dev
```

4. Go to localhost and see result:

```bash
  http://localhost:3000/
```

