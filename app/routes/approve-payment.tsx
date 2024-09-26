import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import { zoomPlugin } from "@react-pdf-viewer/zoom";

import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "~/styles/pdf-styles.css";

import pdfFile from "/invoices/demo-invoice-after-ocr.pdf";

const ApprovePayment = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const zoomPluginInstance = zoomPlugin({ enableShortcuts: true });

  return (
    <div className="flex h-screen bg-white">
      <div className="w-1/2 flex flex-col justify-center items-center ">
        <div className="flex flex-col w-[496px]">
          <h2 className="text-xl font-semibold mb-6">Review Payment Details</h2>
          <div className="mb-4">
            <p className="text-lg font-medium">
              ACH to Contractor (Jason Green)
            </p>
            <p className="text-3xl font-bold">$5,000.00</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Payment rule</h3>
            <p>Pay monthly on the first Monday of the month.</p>
            <ul className="mt-2">
              <li>Oct 7, Mon - $5,000.00</li>
              <li>Nov 4, Mon - $5,000.00</li>
              <li>Dec 2, Mon - $5,000.00</li>
            </ul>
          </div>
          <div className="mt-6">
            <p className="font-semibold">Recipient: Jason Green</p>
            <p>Bank: HSBC</p>
            <p>Account no: 99990101</p>
            <p>Routing no: 123456789</p>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center overflow-auto p-8">
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
        >
          <Viewer
            enableSmoothScroll
            fileUrl={pdfFile}
            plugins={[defaultLayoutPluginInstance, zoomPluginInstance]}
          />
        </Worker>
      </div>
    </div>
  );
};

export default ApprovePayment;
