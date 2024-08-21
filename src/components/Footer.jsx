import { Container } from '@/components/Container'

export function Footer() {
  return (
    <footer className="flex-none py-16">
      <Container className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex text-4xl text-white">
          <svg
            className="w-20 h-20 mr-2"
            viewBox="0 0 381 211"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M162.479 20.7169C175.416 38.7182 171.311 63.7981 153.31 76.7354L67.566 138.357C49.5647 151.294 24.4848 147.189 11.5475 129.187C-1.38984 111.186 2.71548 86.106 20.7168 73.1687L106.461 11.5476C124.462 -1.38974 149.542 2.71559 162.479 20.7169Z"
              fill="#EA4335"
              stroke="#0F0F0F"
              stroke-width="6.66665"
              stroke-miterlimit="10"
            />
            <path
              d="M11.5475 82.3519C-1.38984 100.353 2.71549 125.433 20.7168 138.37L106.461 199.992C124.462 212.929 149.542 208.824 162.479 190.822C175.416 172.821 171.311 147.741 153.31 134.804L67.566 73.1826C49.5647 60.2453 24.4848 64.3506 11.5475 82.3519Z"
              fill="#4285FA"
              stroke="#0F0F0F"
              stroke-width="6.66665"
              stroke-miterlimit="10"
            />
            <path
              d="M369.669 82.3519C382.607 100.353 378.501 125.433 360.5 138.37L274.756 199.992C256.755 212.929 231.675 208.824 218.738 190.822C205.801 172.821 209.906 147.741 227.907 134.804L313.651 73.1826C331.652 60.2453 356.732 64.3506 369.669 82.3519Z"
              fill="#F9AB00"
              stroke="#0F0F0F"
              stroke-width="6.66665"
              stroke-miterlimit="10"
            />
            <path
              d="M218.737 20.7169C205.8 38.7182 209.905 63.7981 227.907 76.7354L313.651 138.357C331.652 151.294 356.732 147.189 369.669 129.187C382.606 111.186 378.501 86.106 360.5 73.1687L274.756 11.5476C256.755 -1.38974 231.675 2.71559 218.737 20.7169Z"
              fill="#34A853"
              stroke="#0F0F0F"
              stroke-width="6.66665"
              stroke-miterlimit="10"
            />
          </svg>
          <span className="mt-4 ml-2 font-semibold">DevFest</span>
        </div>
        <p className="mt-6 text-base text-slate-500 md:mt-0">
          Copyright &copy; {new Date().getFullYear()} GDG Huancayo. All
          rights reserved.
        </p>
      </Container>
    </footer>
  )
}
