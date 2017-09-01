import {
    ViewContainerRef,
    ReflectiveInjector, Injectable, Injector, ComponentRef,
    ComponentFactoryResolver
} from "@angular/core";
import {Observable, ReplaySubject} from "rxjs/Rx";
import {ModalBackdropComponent} from "./modal-backdrop.component";

@Injectable()
export class ModalService {
    // here we hold our placeholder
    private vcRef: ViewContainerRef;
    // here we hold our injector
    private injector: Injector;
    // here we hold the backdrop component
    private backdropRef:ComponentRef<ModalBackdropComponent>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    registerViewContainerRef(vcRef: ViewContainerRef): void {
        this.vcRef = vcRef;
    }

    registerInjector(injector: Injector): void {
        this.injector = injector;
    }

    /**
     * Create component dynamically
     * @param component
     * @param parameters
     * @returns {ReplaySubject}
     */
    create<T>(component: any, parameters?: Object): ComponentRef<T> {
        //create backdrop
        this.backdropRef = this.dynamicComponentLoader<ModalBackdropComponent>(ModalBackdropComponent);

        //create dynamic component
        return this.dynamicComponentLoader<T>(component,parameters);
    }



    /**
     * Load dynamic component and return componentRef
     * @param component
     * @param parameters
     * @returns {ComponentRef}
     */
    private dynamicComponentLoader<T>(component:any,parameters?:Object):ComponentRef<any>{
        // compile the component based on its type and
        // create a component factory
        const factory = this.componentFactoryResolver.resolveComponentFactory(component);
        // the injector will be needed for DI in
        // the custom component
        const childInjector = ReflectiveInjector.resolveAndCreate([], this.injector);
        // create the actual component
        let componentRef = this.vcRef.createComponent(factory, 0, childInjector);
        // pass the @Input parameters to the instance
        Object.assign(componentRef.instance, parameters);
        // add a destroy method to the modal instance
        componentRef.instance["destroy"] = () => {
            // this will close the backdrop
            this.backdropRef.destroy();
            // this will destroy the component
            componentRef.destroy();
        };

        return componentRef;
    }

}

