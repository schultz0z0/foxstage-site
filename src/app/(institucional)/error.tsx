"use client";
import { ErrorState } from "@/components/ui/ErrorState";
export default function Error({retry}:{error:Error & {digest?:string};retry:()=>void}) {
  return <><title>Página indisponível | Foxstage</title><meta name="robots" content="noindex"/><ErrorState retry={retry}/></>;
}
