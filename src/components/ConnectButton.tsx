import { useAppKit } from "@reown/appkit/react";

export default function ConnectButton() {
  // 4. Use modal hook
  const { open } = useAppKit();

  return (
    <div style={{ display: 'flex', gap: '10px', padding: '20px' }}>
      <button onClick={() => open()} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#000', color: '#fff', cursor: 'pointer' }}>
        Open Connect Modal
      </button>
      <button onClick={() => open({ view: "Networks" })} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #000', backgroundColor: '#fff', color: '#000', cursor: 'pointer' }}>
        Open Network Modal
      </button>
    </div>
  );
}