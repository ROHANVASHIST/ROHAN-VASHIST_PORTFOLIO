export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: "thermodynamics-carbon-capture",
    title: "The Thermodynamics of Direct Air Carbon Capture",
    excerpt: "An in-depth thermodynamic analysis of adsorption and absorption processes for global carbon dioxide removal, focusing on heat recovery and energetic performance optimization.",
    content: `Direct Air Capture (DAC) is poised to be a critical pillar in global efforts to mitigate ambient CO₂ concentrations. However, the energy penalty of stripping CO₂ from ultra-dilute atmospheric air (approx. 420 ppm) remains a significant technical challenge.

## The Thermodynamic Limit
From a pure system dynamics standpoint, the minimum thermodynamic work ($W_{min}$) to separate CO₂ from air at atmospheric conditions can be derived from the Gibbs free energy of mixing:

$$W_{min} = RT \\sum x_i \\ln(x_i)$$

At 420 ppm, this translates to roughly $20 \\text{ kJ/mol}_{CO2}$ or $\\approx 125 \\text{ kWh/tonne}_{CO2}$. In practical implementations, solvent regeneration, heat transfer resistance, and fan parasitics drive actual energy requirements to over $1500 \\text{ kWh/tonne}_{CO2}$.

## Adsorption vs. Absorption Pathways
1. **Liquid Solvent Systems (High Temperature)**: Typically utilize aqueous potassium hydroxide (KOH) reacting with CO₂ to form potassium carbonate, which is then precipitated with calcium hydroxide to form calcium carbonate pellets. The thermal regeneration of these pellets in an oxygen-fired calciner requires temperatures upwards of $900^\\circ\\text{C}$. This offers high reliability but comes with massive heat penalties.
2. **Solid Sorbent Systems (Low Temperature)**: Utilize amine-functionalized porous materials or structured matrices. These rely on temperature-swing adsorption (TSA) or vacuum-temperature swing adsorption (VTSA). Desorption takes place at $80^\\circ\\text{C}$ to $120^\\circ\\text{C}$ under low steam pressure, allowing the system to leverage low-grade industrial waste heat.

## Engineering the Regenerator Loop
To make DAC economically viable, regenerative heat exchangers must achieve high thermal effectiveness ($>95\\%$). By coupling the sorbent heat release to incoming wet stream pre-heating loops, we can decrease parasitic steam requirements by up to $30\\%$. 

Our current modeling efforts focus on transient multi-physics simulations on cellular monolithic sorbents to maximize mass transfer coefficients while keeping aerodynamic pressure drop under $100 \\text{ Pa}$ per bed.`,
    category: "Sustainability",
    readTime: "6 min read",
    date: "May 15, 2026",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
  },
  {
    id: "rust-and-webassembly-scientific",
    title: "Rust and WebAssembly for Real-Time Thermomechanical Solvers",
    excerpt: "Leveraging memory-safe systems programming and low-overhead WebAssembly execution to build fluid web-based finite element analysis and physical simulations.",
    content: `Deploying physical simulations, structural analysis, and transient thermal solvers to browser-based client environments historically suffered from JavaScript's runtime overhead and high garbage-collection latency. Rust compiled to WebAssembly (Wasm) offers native-grade computational speeds directly inside safe sandboxed layers.

## Why Rust for Physical Math?
Physical solvers require executing dense linear algebra routines millions of times per frame. Rust excels here due to:
* **Zero-Cost Abstractions**: High-level structural definitions compiler-优化 to raw vector registers.
* **Manual memory layout constraints**: Avoiding GC-induced frame-drops.
* **SIMD support**: WebAssembly supports 128-bit SIMD, unlocking vectorized matrix multiplication directly in Chrome, Firefox, and Safari on any platform.

## High-Performance Data Sharing
A critical bottleneck in full-stack hybrid architectures is the marshaling penalty of copying arrays between the JavaScript garbage-collected heap and WebAssembly's linear memory. 

To eliminate this transfer penalty, we can layout our displacement grids and temperature matrices inside a shared memory buffer:
\`\`\`rust
#[wasm_bindgen]
pub struct Solver {
    temperature_grid: Vec<f64>,
    width: usize,
    height: usize,
}

#[wasm_bindgen]
impl Solver {
    // Returns a raw pointer to our memory buffer
    pub fn temperature_ptr(&self) -> *const f64 {
        self.temperature_grid.as_ptr()
    }
}
\`\`\`

With JavaScript referencing this exact pointer via an \`Float64Array\` view of \`wasm.memory.buffer\`, we entirely avoid cloning rendering assets, delivering pristine 60 FPS visual simulations of multi-thousand boundary node systems.`,
    category: "Software",
    readTime: "4 min read",
    date: "May 02, 2026",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80"
  },
  {
    id: "neural-network-calibration-turbines",
    title: "Using Neural Networks for Transient Gas Turbine Calibration",
    excerpt: "Integrating physics-informed neural network models with classic rotational mechanical state-estimators to predict high-altitude blade degradation hours in advance.",
    content: `Dynamic optimization in high-stakes turbomachinery demands combining classic thermodynamic model equations with real-time statistical inference. Machine learning has emerged as a crucial bridge, but unconstrained neural models often output physically impossible behaviors under extreme conditions.

## Physics-Informed Neural Networks (PINNs)
PINNs address the safety concerns of standard black-box deep learning. By embedding known physical equations—such as conservation of momentum, mass flow continuity, and heat flux relationships—directly into the loss function of our neural network, we bound the statistical model's boundary behaviors:

$$\\mathcal{L} = \\mathcal{L}_{data} + \\lambda \\mathcal{L}_{physics}$$

Where $\\mathcal{L}_{physics}$ measures the residual error of the Navier-Stokes expressions across the turbine cascade.

## Real-Time Embedded Calibration
Our current telemetry stack captures over 140 temperature, vibration, and fuel-flow sensors at $1 \\text{ kHz}$. Using compressed dense models optimized with TensorRT, we run high-accuracy failure predictions on-device, offering safety feedback within microseconds of abnormal pressure deviations.`,
    category: "AI",
    readTime: "8 min read",
    date: "Apr 18, 2026",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80"
  }
];

export function getBlogPosts(): BlogPost[] {
  const stored = localStorage.getItem('rohan_blog_posts');
  if (!stored) {
    localStorage.setItem('rohan_blog_posts', JSON.stringify(DEFAULT_BLOG_POSTS));
    return DEFAULT_BLOG_POSTS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Error parsing blog posts', e);
    return DEFAULT_BLOG_POSTS;
  }
}

export function saveBlogPosts(posts: BlogPost[]) {
  localStorage.setItem('rohan_blog_posts', JSON.stringify(posts));
}

export function addBlogPost(post: Omit<BlogPost, 'id' | 'date'>): BlogPost {
  const posts = getBlogPosts();
  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
  
  const id = post.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
    
  // Check collision
  const exists = posts.some(p => p.id === id);
  const uniqueId = exists ? `${id}-${Math.floor(Math.random() * 1000)}` : id;

  const newPost: BlogPost = {
    ...post,
    id: uniqueId,
    date: formattedDate
  };

  posts.unshift(newPost); // Add at the start
  saveBlogPosts(posts);
  return newPost;
}
