<p className="mb-2 text-gray-600">
<strong>Processor:</strong> {product?.size?.name}
{product?.size?.value}
{product?.core && (
  <span>
    | {product?.core?.core} {product?.core?.thread}
  </span>
)}
</p>
<p className="mb-2 text-gray-600">
<strong>RAM:</strong> {product?.ram?.name} {product?.ram?.value}
</p>
<p className="mb-2 text-gray-600">
<strong>Graphics:</strong> {product?.color?.name}{" "}
{product?.color?.value}
</p>
<p className="mb-2 text-gray-600">
<strong>Storage:</strong> {product?.storage}{" "}
</p>
<p className="mb-2 text-gray-600">
<strong>WIFI | Bluetooth:</strong> {product?.wlanBluetooth}{" "}
</p>
<p className="mb-2 text-gray-600">
<strong>Camera:</strong> {product?.camera}
</p>
<p className="mb-2 text-gray-600">
<strong>Display:</strong> {product?.display}
</p>
<p className="mb-2 text-gray-600">
<strong>Fingerprint:</strong> {product?.fingerPrint}{" "}
</p>
<p className="mb-2 text-gray-600">
<strong>Keyboard:</strong> {product?.keyboard}{" "}
</p>
<p className="mb-2 text-gray-600">
<strong>Ethernet:</strong> {product?.ethernet}{" "}
</p>
<p className="mb-2 text-gray-600">
<strong>Battery:</strong> {product?.battery}
</p>
<p className="mb-2 text-gray-600">
<strong>Power Adapter:</strong> {product?.powerAdapter}
</p>
<p className="mb-2 text-gray-600">
<strong>Memory Slot:</strong> {product?.memorySlot}
{product?.ram?.value}
</p>{" "}
<p className="mb-2 text-gray-600">
<strong>Storage Slot:</strong> {product?.StorageSlot}
</p>
<p className="mb-2 text-gray-600">
<strong>Free Items:</strong> {product?.freeItems}
</p>