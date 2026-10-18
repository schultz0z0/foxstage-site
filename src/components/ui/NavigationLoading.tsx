"use client";
import {useEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
function RouteIndicator() {
  const [pending,setPending]=useState(false);
  const timer=useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(()=>{
    const start=(event:MouseEvent)=>{
      // Next's Link prevents the native navigation before the event reaches document.
      if(event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)return;
      const link=event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if(!link || link.target==="_blank" || link.hasAttribute("download"))return;
      const destination=new URL(link.href,window.location.href);
      if(destination.origin!==window.location.origin || destination.pathname===window.location.pathname)return;
      clearTimeout(timer.current);
      timer.current=setTimeout(()=>setPending(true),180);
    };
    const stop=()=>{clearTimeout(timer.current);setPending(false);};
    document.addEventListener("click",start);window.addEventListener("popstate",stop);window.addEventListener("pageshow",stop);
    return ()=>{clearTimeout(timer.current);document.removeEventListener("click",start);window.removeEventListener("popstate",stop);window.removeEventListener("pageshow",stop);};
  },[]);
  return pending ? <div className="navigation-loading" role="status" aria-live="polite">Carregando a página…</div> : null;
}
export function NavigationLoading(){const pathname=usePathname();return <RouteIndicator key={pathname}/>;}
