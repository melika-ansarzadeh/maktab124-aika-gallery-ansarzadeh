"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaRegTrashAlt } from "react-icons/fa";
import {
	swallLocalization,
	tablelocalization,
} from "@/constants/localization/localization";
import { useRouter, useSearchParams } from "next/navigation";

import { AiOutlineEdit } from "react-icons/ai";
import { Iaddproducts } from "@/services/addProduct/addProduct";
import ModalEdit from "./ModalEdit/ModalEdit";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import { deleteProduct } from "@/services/deleteProduct/deleteProduct";

 export interface Product {
	_id?: string ;
	name: string;
	price: string;
	quantity: string;
	brand: string;
	description: string;
	category: string;
	subcategory: string;
	material: string;
	decorations: string;
	made: string;
	stock: string;
	images?: any;
	[key: string]: any;
}

type TableProps = {
	columns: {
		key: string;
		title: string;
		width?: string;
		render?: (value: any, row: any) => React.ReactNode;
	}[];
	products: Iaddproducts[];
	setProducts: Dispatch<SetStateAction<Iaddproducts[]>>;
	rowsPerPage?: number;
	isDelete?: boolean;
	setIsDelete?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Table({
	columns,
	products,
	rowsPerPage = 10,
	setProducts,
}: TableProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [page, setPage] = useState(1);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	useEffect(() => {
		if (!Array.isArray(products)) {
			console.error("Table data is not an array", products);
		}
	}, [products]);

	const handleDelete = async (_id: string) => {
		try {
			const result = await Swal.fire({
				title: swallLocalization.sure,
				text: swallLocalization.warninigText,
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#d33",
				cancelButtonColor: "#3085d6",
				confirmButtonText: swallLocalization.okDelete,
				cancelButtonText: swallLocalization.cancle,
			});

			if (result.isConfirmed) {
				const success = await deleteProduct(_id);
				if (success) {
					setProducts((prevProducts) =>
						prevProducts.filter((product) => product._id !== _id)
					);
					Swal.fire({
						title: swallLocalization.delete,
						text: swallLocalization.deletedSuccessfully,
						icon: "success",
						confirmButtonText: swallLocalization.ok,
					});
				} else {
					Swal.fire(
						swallLocalization.error,
						swallLocalization.errorHappened,
						"error"
					);
				}
			}
		} catch (error) {
			console.error(error);
			Swal.fire(
				swallLocalization.error,
				swallLocalization.errorHappened,
				"error"
			);
		}
	};

	const handleChangePage = (newPage: number) => {
		setPage(newPage);
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", newPage.toString());
		router.push(`?${params.toString()}`);
	};

	const sortedData = Array.isArray(products) ? [...products] : [];
	const totalPages = Math.ceil(sortedData.length / rowsPerPage);
	const startIndex = (page - 1) * rowsPerPage;
	const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

	const getPageNumbers = () => {
		const range = [];
		const maxPagesToShow = 3;
		let start = Math.max(page - 1, 1);
		let end = Math.min(start + maxPagesToShow - 1, totalPages);
		if (end - start < maxPagesToShow - 1) {
			start = Math.max(end - maxPagesToShow + 1, 1);
		}
		for (let i = start; i <= end; i++) {
			range.push(i);
		}
		return range;
	};

	const getRowColor = (row: any) => {
		if (row.stock === "نا موجود") return "bg-red-100";
		if (row.stock === "به زودی") return "bg-yellow-100";
		if (row.stock === "متوقف شده") return "bg-slate-200";
		return "";
	};

	const handleEdit = (product: Product) => {
		setSelectedProduct(product);
		setIsEditOpen(true);
	};

	return (
		<div className="overflow-x-auto rounded-[2rem] border border-custom-500 bg-gradient-to-br from-custom-100 via-white to-custom-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] py-4 px-3 -mr-9 space-y-4 transition-all">
			<ToastContainer />
			<div className="overflow-hidden rounded-xl border border-custom-500 shadow-inner backdrop-blur-md">
				<table className="min-w-full text-sm font-medium">
					<thead className="bg-custom-400 text-xs uppercase font-sahel tracking-wider">
						<tr>
							{columns.map((col) => (
								<th
									key={col.key}
									style={{ width: col.width || "auto" }}
									className="px-6 py-4 text-center whitespace-nowrap"
								>
									{col.title}
								</th>
							))}
							<th className="px-6 py-4 text-center whitespace-nowrap">
								عملیات
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-custom-500 bg-white font-sahel text-sm font-medium">
						{paginatedData.map((row, i) => (
							<tr
								key={i}
								className={`${getRowColor(
									row
								)} hover:bg-gradient-to-r hover:from-white hover:to-custom-50 transition-colors duration-300`}
							>
								{columns.map((col) => (
									<td
										key={col.key}
										className="py-4 px-1 text-xs text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]"
										title={typeof row[col.key] === "string" ? row[col.key] : ""}
									>
										{col.render ? col.render(row[col.key], row) : row[col.key]}
									</td>
								))}
								<td className="py-4 px-1 text-center whitespace-nowrap">
									<div className="flex justify-center items-center gap-3">
										<button
											onClick={() => handleEdit(row)}
											className="hover:text-blue-600 text-lg"
										>
											<AiOutlineEdit />
										</button>
										<button
											onClick={() => handleDelete(row._id)}
											className="hover:text-red-600"
										>
											<FaRegTrashAlt />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="flex flex-col md:flex-row items-center justify-between text-sm gap-3">
				<span className="text-xs px-2">
					{tablelocalization.show} <b>{startIndex + 1}</b> تا{" "}
					<b>{Math.min(startIndex + rowsPerPage, products?.length)}</b>{" "}
				</span>

				<div className="flex items-center gap-2">
					<button
						onClick={() => handleChangePage(Math.max(page - 1, 1))}
						disabled={page === 1}
						className="p-2 rounded-full bg-white border-2 border-custom-500 hover:bg-custom-400 disabled:opacity-40"
					>
						<FaChevronRight className="w-3 h-3" />
					</button>

					{getPageNumbers().map((pageNum) => (
						<button
							key={pageNum}
							onClick={() => handleChangePage(pageNum)}
							className={`px-3 py-1.5 rounded-xl border-2 text-xs font-semibold shadow-md transition-all ${
								page === pageNum
									? "bg-custom-400 text-white border-custom-500 scale-105"
									: "bg-white border-custom-500 hover:bg-custom-200 hover:scale-[1.05]"
							}`}
						>
							{pageNum}
						</button>
					))}

					<button
						onClick={() => handleChangePage(Math.min(page + 1, totalPages))}
						disabled={page === totalPages}
						className="p-2 rounded-full bg-white border-2 border-custom-500 hover:bg-custom-400 disabled:opacity-40"
					>
						<FaChevronLeft className="w-3 h-3" />
					</button>
				</div>

				{isEditOpen && selectedProduct && (
					<ModalEdit
						isOpen={isEditOpen}
						onClose={() => setIsEditOpen(false)}
						product={selectedProduct}
						onSuccess={() => {
							setIsEditOpen(false);
						}}
						onProductEdited={(updatedProduct: Iaddproducts) => {
							setProducts((prevProducts) =>
								prevProducts.map((product) =>
									product._id === updatedProduct._id ? updatedProduct : product
								)
							);
						}}
					/>
				)}
			</div>
		</div>
	);
}
