import { Download, Printer, Scissors, X } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
	QRCode,
	QRCodeImage,
	QRCodeOverlay,
	QRCodeSkeleton,
	useQRCode,
} from '@/components/ui/qr-code';

type QrCodeEmployeeProps = {
	name: string;
	id: string;
};

const CARD_WIDTH = 220;
const CARD_PADDING = 12;
const QR_SIZE = 160;
const RADIUS = 6;
const EXPORT_SCALE = 4;
const CENTER_ICON_SIZE = 48;

// Layout: name baseline, QR top, id baseline (no overlap)
const NAME_BASELINE_Y = CARD_PADDING + 18;
const QR_TOP_Y = CARD_PADDING + 32;
const ID_BASELINE_Y = QR_TOP_Y + QR_SIZE + 18;
const CARD_HEIGHT = ID_BASELINE_Y + 14;

// Scissors icon SVG for export canvas (download/print) - drawn at CENTER_ICON_SIZE
const SCISSORS_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${CENTER_ICON_SIZE}" height="${CENTER_ICON_SIZE}" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>`;
const SCISSORS_ICON_DATA_URL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(SCISSORS_ICON_SVG)}`;

function roundRect(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	w: number,
	h: number,
	r: number,
) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + w, y, x + w, y + h, r);
	ctx.arcTo(x + w, y + h, x, y + h, r);
	ctx.arcTo(x, y + h, x, y, r);
	ctx.arcTo(x, y, x + w, y, r);
	ctx.closePath();
}

function getThemeColors() {
	const el = document.documentElement;
	const styles = getComputedStyle(el);
	return {
		cardBg: styles.getPropertyValue('--card').trim(),
		cardFg: styles.getPropertyValue('--card-foreground').trim(),
		mutedFg: styles.getPropertyValue('--muted-foreground').trim(),
		border: styles.getPropertyValue('--border').trim(),
	};
}

function drawCardToCanvas(
	ctx: CanvasRenderingContext2D,
	qrDataUrl: string,
	name: string,
	id: string,
): Promise<void> {
	return new Promise((resolve) => {
		const { cardBg, cardFg, mutedFg, border } = getThemeColors();

		// Draw background with rounded corners
		ctx.fillStyle = cardBg;
		ctx.strokeStyle = border;
		ctx.lineWidth = 1;
		roundRect(ctx, 0, 0, CARD_WIDTH, CARD_HEIGHT, RADIUS);
		ctx.fill();
		ctx.stroke();

		// Draw name (above QR)
		ctx.fillStyle = cardFg;
		ctx.font = '600 16px system-ui, sans-serif';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'alphabetic';
		ctx.fillText(name, CARD_WIDTH / 2, NAME_BASELINE_Y);

		const qrX = (CARD_WIDTH - QR_SIZE) / 2;
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.onload = () => {
			ctx.drawImage(img, qrX, QR_TOP_Y, QR_SIZE, QR_SIZE);

			// Draw center icon (barbershop scissors) on top of QR for export
			const iconCenterX = qrX + QR_SIZE / 2;
			const iconCenterY = QR_TOP_Y + QR_SIZE / 2;
			const iconRadius = CENTER_ICON_SIZE / 2;
			const iconImg = new Image();
			// data URL doesn't need crossOrigin; setting it can block load in some browsers
			iconImg.onload = () => {
				// Circle background (match overlay style)
				ctx.fillStyle = cardBg;
				ctx.beginPath();
				ctx.arc(iconCenterX, iconCenterY, iconRadius, 0, Math.PI * 2);
				ctx.fill();
				ctx.strokeStyle = border;
				ctx.lineWidth = 1;
				ctx.stroke();
				// Draw icon centered
				ctx.drawImage(
					iconImg,
					iconCenterX - iconRadius,
					iconCenterY - iconRadius,
					CENTER_ICON_SIZE,
					CENTER_ICON_SIZE,
				);

				// Draw id (below QR)
				ctx.fillStyle = mutedFg;
				ctx.font = '12px system-ui, sans-serif';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'alphabetic';
				ctx.fillText(`ID: ${id}`, CARD_WIDTH / 2, ID_BASELINE_Y);

				resolve();
			};
			iconImg.onerror = () => {
				ctx.fillStyle = mutedFg;
				ctx.font = '12px system-ui, sans-serif';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'alphabetic';
				ctx.fillText(`ID: ${id}`, CARD_WIDTH / 2, ID_BASELINE_Y);
				resolve();
			};
			iconImg.src = SCISSORS_ICON_DATA_URL;
		};
		img.onerror = () => resolve();
		img.src = qrDataUrl;
	});
}

function CardWithActions({
	name,
	id,
	value,
	onClose,
}: {
	name: string;
	id: string;
	value: string;
	onClose?: () => void;
}) {
	const dataUrl = useQRCode((state) => state.dataUrl);

	const getCardBlob = React.useCallback(async (): Promise<Blob | null> => {
		const s = EXPORT_SCALE;
		const exportCanvas = document.createElement('canvas');
		exportCanvas.width = CARD_WIDTH * s;
		exportCanvas.height = CARD_HEIGHT * s;
		const ctx = exportCanvas.getContext('2d');
		if (!ctx) return null;

		ctx.scale(s, s);
		ctx.imageSmoothingEnabled = true;
		ctx.imageSmoothingQuality = 'high';

		// Use same QR as preview (same value + level H) so export is identical and scannable
		let qrExportUrl = dataUrl ?? '';
		try {
			const QRCodeLib = (await import('qrcode')).default;
			qrExportUrl = await QRCodeLib.toDataURL(value, {
				width: QR_SIZE * s,
				margin: 1,
				color: { dark: '#000000', light: '#ffffff' },
				errorCorrectionLevel: 'H',
			});
		} catch {
			if (!qrExportUrl) return null;
		}

		await drawCardToCanvas(ctx, qrExportUrl, name, id);

		return new Promise<Blob | null>((resolve) => {
			exportCanvas.toBlob((blob) => resolve(blob ?? null), 'image/png', 1);
		});
	}, [dataUrl, value, name, id]);

	const handleDownload = React.useCallback(async () => {
		const blob = await getCardBlob();
		if (!blob) return;
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `barcode-${name.replace(/\s+/g, '-')}-${id}.png`;
		a.click();
		URL.revokeObjectURL(url);
	}, [getCardBlob, name, id]);

	const handlePrint = React.useCallback(async () => {
		const blob = await getCardBlob();
		if (!blob) return;
		const url = URL.createObjectURL(blob);
		const printWindow = window.open('', '_blank');
		if (!printWindow) {
			URL.revokeObjectURL(url);
			return;
		}
		const html =
			`<html><head><title>Print Barcode - ${name}</title></head>` +
			`<body style="margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;">` +
			`<img src="${url}" style="max-width:100%;height:auto;" />` +
			`<script>window.onload=function(){window.print();window.close();};</scr` +
			`ipt></body></html>`;
		printWindow.document.write(html);
		printWindow.document.close();
		setTimeout(() => URL.revokeObjectURL(url), 10000);
	}, [getCardBlob, name]);

	return (
		<div className="flex flex-col items-center gap-3">
			<div className="flex w-full flex-col items-center rounded-md border border-border bg-card p-3 text-card-foreground shadow-sm">
				<span className="text-sm font-semibold text-center truncate max-w-full px-1">
					{name}
				</span>
				<div className="relative my-1 flex items-center justify-center size-[160px]">
					<QRCodeSkeleton />
					<QRCodeImage
						alt="Barcode"
						className="relative max-h-[160px] max-w-[160px]"
					/>
					<QRCodeOverlay className="size-12 rounded-full bg-background/90 flex items-center justify-center border border-border shadow-sm">
						<Scissors className="size-6 text-foreground" aria-hidden />
					</QRCodeOverlay>
				</div>
				<span className="text-xs text-muted-foreground font-mono">
					ID: {id}
				</span>
			</div>
			<div className="flex gap-2 w-full flex-wrap items-stretch justify-center">
				<Button
					type="button"
					variant="outline"
					size="sm"
					className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-2"
					onClick={handleDownload}
					disabled={!dataUrl}
				>
					<Download className="size-4 shrink-0" aria-hidden />
					<span>Download</span>
				</Button>
				<Button
					type="button"
					variant="outline"
					size="sm"
					className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-2"
					onClick={handlePrint}
					disabled={!dataUrl}
				>
					<Printer className="size-4 shrink-0" aria-hidden />
					<span>Print</span>
				</Button>
				{onClose && (
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-2"
						onClick={onClose}
					>
						<X className="size-4 shrink-0" aria-hidden />
						<span>Close</span>
					</Button>
				)}
			</div>
		</div>
	);
}

type BarcodeEmployeeProps = QrCodeEmployeeProps & {
	onClose?: () => void;
};

export default function BarcodeEmployee({
	name,
	id,
	onClose,
}: BarcodeEmployeeProps) {
	const qrValue = id;

	return (
		<QRCode value={qrValue} size={QR_SIZE} className="my-2" level="H">
			<CardWithActions name={name} id={id} value={qrValue} onClose={onClose} />
		</QRCode>
	);
}
