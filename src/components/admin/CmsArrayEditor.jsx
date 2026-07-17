import { useState } from 'react';

const input = {
  width: '100%', padding: '10px 14px', border: '1.4px solid #DBDFE6',
  borderRadius: 8, fontSize: 13, fontFamily: "'Inter',sans-serif",
  color: '#1B2230', background: '#FFFFFF',
};

export default function CmsArrayEditor({ items, onUpdate, fields, itemLabel, defaults }) {
  const [data, setData] = useState(items || []);

  const handleUpdate = (next) => {
    setData(next);
    onUpdate(next);
  };

  const update = (index, field, value) => {
    handleUpdate(data.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const add = () => {
    handleUpdate([...data, defaults || {}]);
  };

  const remove = (index) => {
    handleUpdate(data.filter((_, i) => i !== index));
  };

  return (
    <div>
      {data.map((item, i) => (
        <div key={i} style={{ marginBottom: 20, padding: 20, background: '#F5F7FA', borderRadius: 12, border: '1px solid #EEF1F5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: '#0B2545', fontFamily: "'Space Grotesk',sans-serif" }}>
              {itemLabel ? `${itemLabel} ${i + 1}` : `Item ${i + 1}`}
            </span>
            <button onClick={() => remove(i)} style={{ background: '#FEF2F2', border: 'none', borderRadius: 6, padding: '4px 10px', color: '#B91C1C', fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>Remove</button>
          </div>
          {fields.map((field) => {
            const val = item[field.key];
            const isImage = field.key.toLowerCase().includes('image') || field.key.toLowerCase().includes('icon');
            return (
              <div key={field.key} style={{ marginBottom: 10 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#444C5C', marginBottom: 4 }}>{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea value={val || ''} onChange={(e) => update(i, field.key, e.target.value)} rows={field.rows || 2} style={{ ...input, resize: 'vertical' }} />
                ) : field.type === 'select' ? (
                  <select value={val || ''} onChange={(e) => update(i, field.key, e.target.value)} style={input}>
                    {field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                ) : (
                  <input value={val || ''} onChange={(e) => update(i, field.key, e.target.value)} style={input} placeholder={field.placeholder || ''} />
                )}
                {isImage && val && (
                  <div style={{ marginTop: 6, borderRadius: 6, overflow: 'hidden', width: 100, height: 70 }}>
                    <img src={val} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
      <button onClick={add} style={{ width: '100%', padding: '12px 0', background: '#FFFFFF', border: '1.5px dashed #DBDFE6', borderRadius: 10, color: '#0B2545', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
        + Add {itemLabel || 'Item'}
      </button>
    </div>
  );
}
