"use client";

export default function NotFoundPage() {
  return (
    <div className="page-container">
      <div className="content">
        <h1 className="title">404</h1>
        <p className="subtitle">Page Not Found</p>
        <p className="message">
          The page you’re looking for might have been removed, renamed, or is
          temporarily unavailable.
        </p>
        <button className="btn" onClick={() => (window.location.href = "/")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75M3.197 16.126c-.866 1.5.013 3.374 1.513 3.374h14.58c1.5 0 2.376-1.874 1.513-3.374L13.122 3.706c-.86-1.493-2.646-1.493-3.506 0L3.197 16.126z"
            />
          </svg>
          Go to Homepage
        </button>
      </div>

      <style jsx>{`
        /* --- Container --- */
        .page-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          background: #ffffff;
          text-align: center;
          overflow: hidden;
        }

        .content {
          max-width: 500px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* --- Animations --- */
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleUp {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* --- Title --- */
        .title {
          font-size: 8rem;
          font-weight: 800;
          background: linear-gradient(to right, #7f5af0, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: scaleUp 0.8s ease-out forwards;
        }

        /* --- Subtitle --- */
        .subtitle {
          font-size: 1.5rem;
          font-weight: 500;
          color: #4b5563;
          animation: fadeUp 0.8s ease-out 0.1s forwards;
        }

        /* --- Message --- */
        .message {
          font-size: 1rem;
          color: #6b7280;
          line-height: 1.5;
          animation: fadeUp 0.8s ease-out 0.2s forwards;
        }

        /* --- Button --- */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          font-weight: 600;
          font-size: 1rem;
          border: none;
          border-radius: 9999px;
          background-color: #3b82f6;
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          animation: scaleUp 0.8s ease-out 0.3s forwards;
          transform: scale(0.9);
          opacity: 0;
        }

        .btn:hover {
          background-color: #2563eb;
        }

        .btn:active {
          transform: scale(0.95);
        }

        .icon {
          width: 20px;
          height: 20px;
        }

        /* --- Responsive --- */
        @media (max-width: 640px) {
          .title {
            font-size: 6rem;
          }
        }
      `}</style>
    </div>
  );
}
